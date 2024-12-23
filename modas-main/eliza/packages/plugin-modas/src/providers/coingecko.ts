import axios from 'axios';

const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY;
const BASE_URL = 'https://api.coingecko.com/api/v3';

// Types for API responses
interface CoinGeckoMarketData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  total_volume: number;
}

// Cache configuration
const CACHE_DURATION = 30 * 1000; // 30 seconds
interface CacheData {
  marketData: CoinGeckoMarketData[] | null;
  timestamp: number;
}

let marketDataCache: CacheData = {
  marketData: null,
  timestamp: 0
};

// Helper function to check if cache is valid
function isCacheValid(): boolean {
  return Date.now() - marketDataCache.timestamp < CACHE_DURATION;
}

// Initialize axios instance with API key
const api = axios.create({
  baseURL: BASE_URL,
  headers: COINGECKO_API_KEY ? {
    'x-cg-pro-api-key': COINGECKO_API_KEY
  } : {}
});

// Format currency with appropriate decimal places
export function formatCurrency(value: number): string {
  if (value >= 1000) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  } else {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 4,
      maximumFractionDigits: 6
    }).format(value);
  }
}

// Format price change percentage
export function formatPriceChange(value: number): string {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: 'always'
  }).format(value / 100);
  return formatted;
}

async function fetchMarketData(limit: number): Promise<CoinGeckoMarketData[]> {
  // Check cache first
  if (isCacheValid() && marketDataCache.marketData) {
    return marketDataCache.marketData.slice(0, limit);
  }

  try {
    const response = await api.get<CoinGeckoMarketData[]>('/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: Math.max(limit, 10), // Always fetch at least 10 for cache
        page: 1,
        sparkline: false
      }
    });

    // Update cache
    marketDataCache = {
      marketData: response.data,
      timestamp: Date.now()
    };

    return response.data.slice(0, limit);
  } catch (error) {
    throw error;
  }
}

export const coinGeckoProvider = {
  getMarketData: async (limit = 10): Promise<CoinGeckoMarketData[]> => {
    return fetchMarketData(limit);
  }
};
