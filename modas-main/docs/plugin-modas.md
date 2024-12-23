# MoDAS Plugin Documentation

## Overview
The MoDAS (Mode DeFi Agent Swarm) plugin is a comprehensive suite of AI-powered tools for interacting with the Mode blockchain and DeFi ecosystem. It provides a modular architecture with specialized agents, actions, evaluators, and providers to enable automated DeFi operations.

## Core Components

### Actions

#### 1. Coordinator Action
- **coordinate**: Orchestrates tasks across multiple agents
  - Parameters: task description, list of agent IDs
  - Returns: Coordination result with success status and message
  - Handles multi-agent task delegation and synchronization

#### 2. Market Analysis Action
- **getMarketMetrics**: Fetch current market metrics
  - Returns: Market metrics data
- **analyzeTrends**: Analyze market trends
  - Returns: Trend analysis results

#### 3. Portfolio Action
- **trackPortfolio**: Monitor portfolio performance
  - Returns: Portfolio tracking data
- **optimizeStrategy**: Optimize portfolio strategy
  - Returns: Strategy optimization recommendations

#### 4. Risk Action
- **assessRisk**: Evaluate portfolio risks
  - Returns: Risk assessment data
- **mitigateRisk**: Implement risk mitigation strategies
  - Returns: Risk mitigation results

#### 5. Analytics Action
- **trackUserActivity**: Monitor user interactions
  - Parameters: userId, activity data (type, timestamp, details)
  - Returns: Void

- **generateReport**: Create analytics reports
  - Parameters: timeframe (start, end, interval)
  - Returns: Report with summary, details, and metrics

- **monitorPerformance**: Track system performance
  - Parameters: metrics configuration
  - Returns: Performance data (latency, success rate, error rate)

#### 6. Security Action
- **validateTransaction**: Validate transaction safety
  - Parameters: transaction data (type, amount, token, destination)
  - Returns: Validation result with risk level and warnings

- **monitorWallet**: Monitor wallet security
  - Parameters: wallet address
  - Returns: Security status with approvals and risk exposure

- **detectAnomalies**: Detect suspicious activities
  - Parameters: activity data
  - Returns: Array of anomaly reports

#### 7. Send Message Action
- **sendMessage**: Inter-agent communication
  - Parameters: targetAgent, message, roomId, userId
  - Returns: Message delivery status

#### 8. DeFi Operations
- **swap**: Execute token swaps
  - Parameters: tokenIn, tokenOut, amount, slippage
  - Returns: Transaction hash

- **provideLiquidity**: Add liquidity to pools
  - Parameters: pool, tokenA, tokenB, amountA, amountB
  - Returns: Transaction hash

- **stake**: Stake tokens
  - Parameters: token, amount, duration
  - Returns: Transaction hash

- **borrow**: Borrow assets
  - Parameters: collateral, collateralAmount, borrowToken, borrowAmount
  - Returns: Transaction hash

#### 9. Mode Operations
- **deployToken**: Deploy new ERC20 tokens
  - Parameters: decimals, initialSupply, name, symbol
  - Returns: Token contract address

- **transferAssets**: Transfer ETH or ERC20 tokens
  - Parameters: recipient address, amount, optional token contract
  - Returns: Transaction hash

- **checkBalance**: Query ETH or token balances
  - Parameters: optional token address, optional wallet address
  - Returns: Balance as a number

- **bridgeAssets**: Bridge assets between L1 and L2
  - Parameters: amount, direction (L1toL2 or L2toL1)
  - Returns: Transaction hash

#### 10. DEX Operations
- **swapTokens**: Execute token swaps
  - Parameters: inputToken, outputToken, amount, slippage
  - Returns: Transaction hash

- **getQuote**: Get swap quotes
  - Parameters: inputToken, outputToken, amount
  - Returns: Quote details including price impact

- **findBestRoute**: Find optimal swap route
  - Parameters: inputToken, outputToken, amount, slippage
  - Returns: Route information

#### 11. NFT Operations
- **createCollection**: Create NFT collection
  - Parameters: name, symbol, baseURI, royaltyBps
  - Returns: Collection contract address

- **mintNFT**: Mint NFT to collection
  - Parameters: collectionAddress, tokenId, uri
  - Returns: NFT token ID

- **listNFT**: List NFT on marketplace
  - Parameters: nftAddress, tokenId, price, marketplace
  - Returns: Listing ID

- **buyNFT**: Purchase NFT from marketplace
  - Parameters: nftAddress, tokenId, price, marketplace
  - Returns: Transaction hash

### Evaluators

#### 1. Market Evaluator
- Real-time market analysis
- Price trend detection
- Volume analysis
- Market sentiment evaluation
- Custom market indicators
- Liquidity analysis
- Market depth evaluation
- Order book analysis

#### 2. Risk Evaluator
- Portfolio risk assessment
- Impermanent loss calculation
- Volatility analysis
- Exposure monitoring
- Risk-adjusted returns
- Correlation analysis
- Drawdown assessment
- Stress testing scenarios

#### 3. Strategy Evaluator
- **evaluatePerformance**: Analyze strategy performance
  - Parameters: strategy configuration
  - Returns: Performance metrics (returns, Sharpe ratio, drawdown)

- **optimizeParameters**: Optimize strategy parameters
  - Parameters: strategy configuration
  - Returns: Optimized parameters with confidence levels

- **backtest**: Run strategy backtests
  - Parameters: strategy, timeframe
  - Returns: Backtest results with trades and metrics

#### 4. Sentiment Evaluator
- **analyzeSocialSentiment**: Analyze asset sentiment
  - Parameters: asset identifier
  - Returns: Sentiment score (-1 to 1), volume, momentum

- **predictTrends**: Predict market trends
  - Parameters: trend data, timeframe
  - Returns: Direction prediction with confidence

- **detectEvents**: Monitor market events
  - Parameters: timeframe
  - Returns: Array of market events with impact assessment

### Providers

#### 1. Mode Agent Kit Provider
- **getAgent**: Get initialized Mode Agent instance
  - Returns: ModeAgentKit instance
- **initialize**: Initialize agent with credentials
  - Parameters: privateKey, rpcUrl, openAiKey
  - Returns: void

#### 2. Mode Bridge Provider
- L1/L2 bridging
- Asset transfer monitoring
- Bridge status tracking
- Fee estimation
- Transaction verification
- Bridge event monitoring
- Asset balance tracking
- Bridge analytics

#### 3. Etherscan Provider
- Real-time transaction monitoring
- Contract verification
- Account tracking
- RPC node access
- WebSocket subscriptions
- Transaction history
- Token transfers tracking
- Contract interaction monitoring

#### 4. DeFiLlama Provider
- **getTVL**: Get protocol TVL
  - Returns: Current TVL value
- **getProtocolMetrics**: Fetch protocol statistics
  - Returns: Comprehensive protocol metrics
- **getYieldFarms**: List yield farming opportunities
  - Returns: Available yield farms with APY

#### 5. CoinGecko Provider
- **getPrice**: Get token price
  - Parameters: tokenId
  - Returns: Current price
- **getMarketData**: Fetch market statistics
  - Parameters: tokenId
  - Returns: Market data
- **getHistoricalData**: Get price history
  - Parameters: tokenId, days
  - Returns: Historical price data

#### 6. Web3 Provider
- **deployContract**: Deploy smart contract
  - Parameters: abi, bytecode, constructorArgs
  - Returns: Contract address
- **callContract**: Call contract method
  - Parameters: address, method, args
  - Returns: Method result
- **estimateGas**: Estimate transaction gas
  - Parameters: txParams
  - Returns: Gas estimate

#### 7. Social Provider
- **getTwitterData**: Fetch Twitter metrics
  - Parameters: query
  - Returns: Tweet data, engagement metrics
- **getRedditData**: Analyze Reddit activity
  - Parameters: subreddit
  - Returns: Post data, community metrics
- **getTelegramData**: Monitor Telegram channels
  - Parameters: channel
  - Returns: Message data, channel metrics
- **getDiscordData**: Track Discord activity
  - Parameters: server
  - Returns: Server activity metrics

#### 8. Mode RPC Provider
- **getProvider**: Get RPC provider instance
  - Returns: Web3Provider
- **getNetwork**: Get network details
  - Returns: Network configuration
- **getGasPrice**: Get current gas price
  - Returns: Gas price in wei
- **getBlock**: Get block details
  - Returns: Block information
