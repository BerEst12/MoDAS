# MoDAS: Mode DeFi Agent Swarm

<div align="center">
  <img src="assets/logo/Logo500x500/logoSodaIaPurple500x500.png" alt="MoDAS Logo" width="200"/>
  <h3>Revolutionizing DeFi with AI-Powered Agent Swarms</h3>
  <p>Simplify your DeFi experience with the power of Multi-Agent Systems (MAS)</p>

  <p align="center">
    <a href="https://modas.worksgood.xyz/">
      <img src="https://img.shields.io/badge/Website-modas-purple?style=for-the-badge" alt="Website" />
    </a>
    <a href="https://discord.gg/mmJJtGpkqy">
      <img src="https://img.shields.io/badge/Discord-Join%20Us-blue?style=for-the-badge&logo=discord" alt="Discord" />
    </a>
    <a href="https://x.com/MoDASMemeWizard">
      <img src="https://img.shields.io/badge/X-Follow%20Us-blue?style=for-the-badge&logo=x"
       alt="Twitter" />
    </a>
  </p>
</div>

<div align="center">
  <h3>🏆 Mode Network Project</h3>
</div>

---

## 📚 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Features](#-features)
- [📖 Documentation](#-documentation)
- [🏗️ Project Structure](#️-project-structure)
- [🚀 Getting Started](#-getting-started)
- [💻 Web Client](#-web-client)
- [🛠️ Development](#️-development)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🌟 Overview

MoDAS (Mode DeFi Agent Swarm) is an innovative open-source project that simplifies and automates interactions with the Mode DeFi ecosystem through AI-powered agent swarms. Part of the broader AI Workforce Suite (AIWS), MoDAS demonstrates how collaborative AI agents can revolutionize DeFi workflows.

### Why Multi-Agent Systems (MAS)?

Our platform leverages a Multi-Agent System architecture where each agent specializes in specific tasks—from fetching metrics to executing trades—enabling modular, scalable, and efficient operations. This approach ensures:

- **🎯 Specialization**: Optimized performance through task-specific agents
- **📈 Scalability**: Easy addition of new agents and features
- **🛡️ Robustness**: Continued operation even if individual agents fail
- **⚡ Efficiency**: Parallel task execution for improved performance
- **🔄 Adaptability**: Seamless integration with new protocols and APIs

## ✨ Features

### 🖥️ Web Client & Landing Page
- 🤖 Chat with Agent Swarm through web interface
- 👛 Mode Wallet integration (MetaMask)
- 📊 Portfolio & Analytics dashboard
- 🎨 Modern, responsive design

<div align="center">
  <img src="assets/modas-web-client.png" alt="MoDAS Web Client" width="800"/>
</div>

### 🤖 Agent Capabilities
- 🌐 Social Media Automation (Twitter/X, Warpcast)
- 💬 Multi-Client Communication (Telegram, Discord, Web)
- 🔐 Mode Wallet Functions:
  - Wallet integration (MetaMask)
  - Balance checking and transactions
- 📈 DeFi Insights via multiple APIs

### 🎭 Specialized Agents
1. 🎮 Coordinator Agent: Task orchestration
2. 📊 Metrics Agent: DeFi analytics
3. 💼 Sales Agent: Customer support
4. 🎨 Meme Agent: Social engagement
5. 🖼️ NFTs Agent: NFT operations
6. 🔍 Alpha Agent: Market opportunities
7. 💱 DeFi Agent: Protocol interactions
8. 📈 Trading Agent: Trade execution
9. 👛 Wallet Agent: Asset management
10. 📋 Analyst Agent: Market analysis

## 📖 Documentation

| Document | Description |
|----------|-------------|
| [Overview](docs/overview.md) | Project concept and benefits |
| [Whitepaper](docs/whitepaper.md) | Technical architecture and MAS approach |
| [Business Plan](docs/business-plan.md) | Business model and revenue streams |
| [Plugin Documentation](docs/plugin-modas.md) | MoDAS plugin technical specs |
| [AIWS Vision](docs/aiws.md) | AI Workforce Suite overview |
| [Specifications](docs/specs.md) | Technical specifications |
| [Branding Guide](assets/branding-guide.md) | Logo, colors, and style guide |

## 🏗️ Project Structure

```bash
modas/
├── assets/                     # Project assets and branding
│   ├── logo/                  # Logo files and variations
│   └── images/                # Screenshots and graphics
├── docs/                      # Documentation files
├── eliza/                     # AI Agent System
│   ├── agent/                # Core agent system
│   ├── characters/           # Agent character definitions
│   ├── client/              # Web client application
│   ├── packages/            # Plugin packages
│   │   ├── plugin-modas/   # Main Mode DeFi plugin
│   │   └── plugin-web3/    # Web3/EVM integration
│   └── scripts/            # Build and utility scripts
└── contracts/              # Smart contract tests
    └── src/               # Test source files
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- pnpm (v8+)
- MetaMask wallet

### Required Environment Variables
```bash
# Core AI Configuration
OPENAI_API_KEY=           # OpenAI API key
ANTHROPIC_API_KEY=        # Claude API key
GROK_API_KEY=             # Grok API key
OPENROUTER_API_KEY=       # OpenRouter API key

# Blockchain Configuration
EVM_PRIVATE_KEY=         # Mode wallet private key
EVM_PUBLIC_KEY=          # Mode wallet public address
EVM_RPC_URL=            # Mode RPC endpoint (default: mainnet)
EVM_CHAIN_ID=           # Mode Chain ID (34443 for mainnet)

# API Keys
ETHERSCAN_API_KEY=       # Etherscan API for blockchain data
ALCHEMY_API_KEY=         # Alchemy API access

# Social Integration
TWITTER_USERNAME=        # Twitter account username
TWITTER_PASSWORD=        # Twitter account password
TWITTER_EMAIL=           # Twitter account email
TWITTER_DRY_RUN=        # Enable/disable test mode
FARCASTER_FID=          # Farcaster ID for social integration

# Bot Configuration
TELEGRAM_BOT_TOKEN_SALES=      # Telegram sales bot token
TELEGRAM_BOT_TOKEN_COORDINATOR= # Telegram coordinator bot token
DISCORD_APPLICATION_ID=         # Discord application ID
DISCORD_API_TOKEN=             # Discord bot token

# Feature Flags
IMAGE_GEN=              # Enable/disable image generation
POST_IMMEDIATELY=       # Enable immediate posting
DISABLE_PORTFOLIO_FETCHING= # Disable portfolio tracking
```

### Running the Agents

```bash
# Navigate to the eliza directory
cd modas/eliza

# Install dependencies
pnpm install

# Build the project
pnpm build

# Start all 10 agents
pnpm start --characters="characters/coordinator.character.json,characters/metrics-agent.character.json,characters/sales-agent.character.json,characters/meme-agent.character.json,characters/nfts-agent.character.json,characters/alpha-agent.character.json,characters/defi-agent.character.json,characters/trading-agent.character.json,characters/wallet-agent.character.json,characters/analyst-agent.character.json"
```

### Running the Web Client

```bash
# Navigate to the client directory
cd modas/eliza/client

# Start the development server
pnpm run dev
```

## 💻 Web Client

The MoDAS web client provides a modern interface for interacting with the agent swarm:

- ⚡ Real-time chat with AI agents
- 📊 Portfolio tracking and analytics
- 💱 DeFi operation execution
- 👛 Wallet integration (MetaMask)

## 🛠️ Development

```bash
# Run tests
pnpm test

# Lint code
pnpm lint

# Build specific package
pnpm --filter @ai16z/plugin-modas build
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Built with ❤️ by the MoDAS team</p>
  <p>
    <a href="https://discord.gg/mmJJtGpkqy">
      <img src="https://img.shields.io/badge/Discord-Join-7289DA?style=for-the-badge&logo=discord" alt="Discord" />
    </a>
    <a href="https://x.com/MoDasAgent">
      <img src="https://img.shields.io/badge/Twitter-Follow%20Us-blue?style=for-the-badge&logo=twitter" alt="Twitter" />
    </a>
    </a>
  </p>
</div>