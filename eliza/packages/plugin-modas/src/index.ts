import type { Plugin, Action, State as ElizaState, Memory as ElizaMemory, IAgentRuntime, HandlerCallback } from '@ai16z/eliza';
import { defiLlamaProvider, formatTVL, formatPercentage } from './providers/defillama';
import { coinGeckoProvider, formatCurrency, formatPriceChange } from './providers/coingecko';

export interface State extends ElizaState {
  lastMessageId?: string;
}

interface Memory extends ElizaMemory {
  text?: string;
}

const tvlAction: Action = {
  name: 'TVL',
  similes: ['TVL', 'DEFI', 'METRICS', 'ANALYSIS'],
  description: 'Get detailed TVL metrics for Mode Network and global DeFi',
  validate: async (_runtime: IAgentRuntime, _message: Memory) => true,
  handler: async (runtime: IAgentRuntime, message: Memory, _state?: State, _options?: unknown, callback?: HandlerCallback) => {
    if (!callback) return;

    try {
      const tvlData = await defiLlamaProvider.getTVL();

      const text = [
        'As of now, the Total Value Locked (TVL) in Mode DeFi currently stands at:',
        '',
        'Mode Network Ecosystem Metrics:',
        `Total TVL: ${formatTVL(tvlData.tvl)}`,
        `Market Share: ${formatPercentage(tvlData.globalMetrics.modePercentage)}`,
        '',
        'Top 3 Mode Network Protocols:',
        tvlData.protocols
          .map((p, i) => `${i + 1}. ${p.name}: ${formatTVL(p.tvl)}`)
          .join('\n'),
        '',
        'Global DeFi TVL Analysis:',
        `Total DeFi TVL: ${formatTVL(tvlData.globalMetrics.totalTvl)}`,
        '',
        'Top 5 Chains by TVL:',
        tvlData.globalMetrics.topChains
          .map((chain, i) => `${i + 1}. ${chain.name}: ${formatTVL(chain.tvl)} (${formatPercentage(chain.percentage)})`)
          .join('\n'),
        '',
        'This growth is largely attributed to our strategic liquidity mining initiatives and successful partnership integrations.'
      ].join('\n');

      // Log for debugging
      await runtime.databaseAdapter.log({
        body: { message, text },
        userId: message.userId,
        roomId: message.roomId,
        type: 'tvl'
      });

      callback({
        text,
        source: 'modas',
        action: 'TVL',
        messageId: `tvl-${Date.now()}`,
        attachments: []
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      callback({
        text: `Error in TVL action: ${errorMessage}`,
        source: 'modas',
        action: 'TVL',
        messageId: `tvl-error-${Date.now()}`,
        attachments: []
      });
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: { text: "What's the current TVL in DeFi?" },
      },
      {
        user: "{{user2}}",
        content: {
          text: "I'll check the TVL metrics for you",
          action: "TVL"
        },
      }
    ]
  ]
};

const priceAction: Action = {
  name: 'PRICE',
  similes: ['show me crypto prices', 'what is the price of', 'check token prices'],
  description: 'Get current price and market data for popular cryptocurrencies',
  validate: async (_runtime: IAgentRuntime, _message: Memory) => true,
  handler: async (runtime: IAgentRuntime, message: Memory, _state?: State, _options?: unknown, callback?: HandlerCallback) => {
    if (!callback) return;

    try {
      const marketData = await coinGeckoProvider.getMarketData(10);

      const text = [
        'Currently, here are the prices for popular cryptocurrencies:',
        '',
        marketData
          .map(token =>
            `${token.name} (${token.symbol.toUpperCase()}): ${formatCurrency(token.current_price)} (${formatPriceChange(token.price_change_percentage_24h)})`
          )
          .join('\n'),
        '',
        'Prices are updated every 30 seconds. Let me know if you need more specific market data!'
      ].join('\n');

      // Log for debugging
      await runtime.databaseAdapter.log({
        body: { message, text },
        userId: message.userId,
        roomId: message.roomId,
        type: 'price'
      });

      callback({
        text,
        source: 'modas',
        action: 'PRICE',
        messageId: `price-${Date.now()}`,
        attachments: []
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      callback({
        text: `Error fetching prices: ${errorMessage}`,
        source: 'modas',
        action: 'PRICE',
        messageId: `price-error-${Date.now()}`,
        attachments: []
      });
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: { text: "Show me crypto prices" },
      },
      {
        user: "{{user2}}",
        content: {
          text: "I'll show you the current prices of popular cryptocurrencies",
          action: "PRICE"
        },
      }
    ]
  ]
};

export const modasPlugin: Plugin = {
  name: 'modas',
  description: 'A plugin for Mode Network DeFi interactions',
  actions: [tvlAction, priceAction]
};

export default modasPlugin;

