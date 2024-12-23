# MoDAS Token (MODAS)

MoDAS Token is an ERC-20 token deployed on the Mode Sepolia testnet. It implements advanced security and control features.

## Contract Information
- **Network**: Mode Sepolia Testnet (Chain ID: 919)
- **Contract Address**: `0x92951AB7015F4907542B1578394E978d3BAd0C14`
- **Explorer**: [View on Mode Sepolia Explorer](https://sepolia.explorer.mode.network/address/0x92951AB7015F4907542B1578394E978d3BAd0C14)

## Features

- **Name**: MoDAS Token
- **Symbol**: MODAS
- **Decimals**: 18
- **Maximum Supply**: 10,000,000 MODAS
- **Initial Supply**: 1,000,000 MODAS

### Special Features

1. **Transaction Control**
   - Maximum transaction limit (1% of total supply)
   - Transaction limit exclusion list
   - Token locking system

2. **Administrative Functions**
   - Owner-controlled minting
   - Token burning by any holder
   - Ownership control through Ownable
   - Ability to exclude addresses from transaction limit
   - Token temporal locking system

## Project Setup

### Prerequisites
- Node.js v14+ 
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Compile contracts
npx hardhat compile
```

### Deployment
```bash
# Set up environment variables
cp .env.example .env
# Edit .env with your keys

# Deploy to Mode Sepolia
npx hardhat run scripts/deploy.js --network mode_sepolia
```

### Verification
```bash
# Flatten contract
node scripts/flatten.js

# Verify on explorer
npm run verify
```

## Project Structure
```
├── contracts/
│   ├── MoDASToken.sol          # Main contract
│   └── MoDASToken.flattened.sol # Flattened contract for verification
├── scripts/
│   ├── deploy.js               # Deployment script
│   ├── verify.js              # Verification script
│   └── flatten.js             # Contract flattening script
├── hardhat.config.js          # Hardhat configuration
└── .env                       # Environment variables
```

## Security

The contract includes several security features:
- Transaction limits to prevent market manipulation
- Time-lock system for vesting
- Role-based access control
- Protection against overflow/underflow through SafeMath (included in Solidity 0.8+)

## Mode Sepolia Network

- **Network Name**: Mode Sepolia Testnet
- **Chain ID**: 919
- **RPC URL**: https://sepolia.mode.network
- **Explorer**: https://sepolia.explorer.mode.network

## License

This project is under the MIT License.
