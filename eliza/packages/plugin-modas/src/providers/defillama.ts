import type { Provider, IAgentRuntime, Memory, State } from '@ai16z/eliza';
import axios from 'axios';

interface ChainTVLData {
  name: string;
  tvl: number;
  chainId: string;
  tokenSymbol: string;
}

interface ProtocolData {
  id: string;
  name: string;
  chain: string;
  tvl: number;
  chainTvls: {
    [key: string]: number;
  };
  symbol: string;
  category: string;
}

interface YieldPoolData {
  chain: string;
  name: string;
  tvl: number;
  apy: number;
}

interface ProtocolMetrics {
  name: string;
  tvl: number;
}

interface GlobalTVLResponse {
  totalTvl: number;
  modePercentage: number;
  modeTvl: number;
  topChains: Array<{
    name: string;
    tvl: number;
    percentage: number;
  }>;
}

interface TVLResponse {
  tvl: number;
  protocols: ProtocolMetrics[];
  globalMetrics: GlobalTVLResponse;
}

// Cache configuration
const CACHE_DURATION = 30 * 1000; // 30 seconds
let tvlCache: { data: TVLResponse | null; timestamp: number } = {
  data: null,
  timestamp: 0
};

// Helper function to check if cache is valid
function isCacheValid(): boolean {
  return Date.now() - tvlCache.timestamp < CACHE_DURATION;
}

export interface DefiLlamaProvider extends Provider {
  get: (runtime: IAgentRuntime, message: Memory, state?: State) => Promise<TVLResponse | null>;
  getTVL: () => Promise<TVLResponse>;
  getProtocolMetrics: () => Promise<ProtocolMetrics[]>;
  getYieldFarms: () => Promise<ProtocolMetrics[]>;
  getGlobalTVL: () => Promise<GlobalTVLResponse>;
}

// Format TVL numbers to be more readable
export function formatTVL(tvl: number): string {
  const billion = 1000000000;
  const million = 1000000;
  if (tvl >= billion) {
    return `$${(tvl / billion).toFixed(2)}B`;
  }
  return `$${(tvl / million).toFixed(2)}M`;
}

// Format percentage with 2 decimal places
export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(2)}%`;
}

async function fetchTVLData(): Promise<TVLResponse> {
  // Check cache first
  if (isCacheValid() && tvlCache.data) {
    return tvlCache.data;
  }

  try {
    // Fetch all data in parallel
    const [chainResponse, protocolsResponse] = await Promise.all([
      axios.get<ChainTVLData[]>('https://api.llama.fi/v2/chains'),
      axios.get<ProtocolData[]>('https://api.llama.fi/protocols')
    ]);

    const totalTvl = chainResponse.data.reduce((sum, chain) => sum + chain.tvl, 0);
    const modeData = chainResponse.data.find((chain) => chain.name.toLowerCase() === 'mode');
    const modeTvl = modeData?.tvl || 0;
    const modePercentage = modeTvl / totalTvl;

    const topChains = chainResponse.data
      .sort((a, b) => b.tvl - a.tvl)
      .slice(0, 5)
      .map(chain => ({
        name: chain.name,
        tvl: chain.tvl,
        percentage: chain.tvl / totalTvl
      }));

    const modeProtocols = protocolsResponse.data
      .filter((protocol) => protocol.chain === 'Mode' || (protocol.chainTvls && protocol.chainTvls.Mode > 0))
      .map((protocol) => ({
        name: protocol.name,
        tvl: protocol.chainTvls?.Mode || (protocol.chain === 'Mode' ? protocol.tvl : 0)
      }))
      .sort((a, b) => b.tvl - a.tvl)
      .slice(0, 3);

    const response: TVLResponse = {
      tvl: modeTvl,
      protocols: modeProtocols,
      globalMetrics: {
        totalTvl,
        modeTvl,
        modePercentage,
        topChains
      }
    };

    // Update cache
    tvlCache = {
      data: response,
      timestamp: Date.now()
    };

    return response;
  } catch (error) {
    console.error('Error fetching TVL data:', error);
    throw error;
  }
}

// DeFiLlama API Provider implementation
export const defiLlamaProvider: DefiLlamaProvider = {
  get: async (_runtime: IAgentRuntime, _message: Memory, _state?: State): Promise<TVLResponse | null> => {
    return null;
  },

  getTVL: async (): Promise<TVLResponse> => {
    return fetchTVLData();
  },

  getProtocolMetrics: async (): Promise<ProtocolMetrics[]> => {
    const data = await fetchTVLData();
    return data.protocols;
  },

  getYieldFarms: async (): Promise<ProtocolMetrics[]> => {
    try {
      const response = await axios.get<YieldPoolData[]>('https://api.llama.fi/pools');
      return response.data
        .filter((pool) => pool.chain === 'Mode')
        .map((pool) => ({
          name: pool.name,
          tvl: pool.tvl
        }))
        .sort((a, b) => b.tvl - a.tvl)
        .slice(0, 3);
    } catch (error) {
      console.error('Error fetching yield farms:', error);
      throw error;
    }
  }
};
