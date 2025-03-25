# ProductTokenWeave - Track Winner at Arbitrum Stylus Mini Hack
ProductTokenWeave is a decentralized platform that combines product launch announcements, RWA tokenization, and ZK-SNARK validation. Built on Arbitrum Stylus, it enables secure product launches with integrated Twitter marketing and on-chain verification.

![ProductTokenWeave Flow](Flow.png)
![ProductTokenWeave Screenshot](Photo.png)

## 🚀 Features

- **Instant Product Launch**: Seamlessly announce products on Twitter while creating verifiable on-chain records
- **RWA Tokenization**: Transform product details into secure digital assets
- **Privacy-Preserving**: ZK-SNARK validation ensures data privacy while maintaining verifiability
- **Twitter Integration**: Automated product announcements and marketing integration
- **Secure Storage**: IPFS integration for decentralized metadata storage

## 🔧 Tech Stack
### 🔐 Arbitrum Stylus (Rust Contracts): Efficient and faster smart contract deployment.
### 🐦 Twitter API: Automated product launch announcements and marketing integration.
### 🔐 Circom + Snarkjs: ZK-SNARK Proof generation for secure and private verification.
### 📦 Pinata IPFS: Decentralized storage for product details and metadata, ensuring security and immutability.
### 🔐 Ethers.js: Ethereum wallet integration for secure transactions.

- **Smart Contracts**: Arbitrum Stylus (Rust)
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Web3**: Ethers.js, Arb-Stylus-SDK, Rust
- **Privacy**: Circom + Snarkjs for ZK-SNARK proofs
- **Storage**: Pinata IPFS
- **Social**: Twitter API v2
- **UI Components**: Shadcn UI, Radix UI

## 📦 Installation

1. **Clone the Repository**
```bash
git clone https://github.com/your-username/ProductTokenWeave.git
cd ProductTokenWeave
```

2. **Environment Setup**
```bash
# Copy example env file
cp .env.example .env

# Add your credentials to .env
TWITTER_API_KEY=your_twitter_api_key
TWITTER_BEARER_TOKEN=your_bearer_token
```

3. **Install Dependencies**
```bash
# Install frontend dependencies
cd frontend
npm install

# Install ZK dependencies globally
npm install -g circom snarkjs
```

4. **Compile ZK Circuit**
```bash
# Compile the circuit
cd Solidity+zkp
npm run compile:circuit
```

5. **Start Development Server**
```bash
# Start frontend
cd frontend
npm run dev
```

## 🔐 ZK-SNARK Workflow

1. **Circuit Compilation**
   - Product details are validated using ZK-SNARK circuits
   - Circom circuit ensures data integrity and privacy
   - Generates proof of valid product details without revealing data

2. **Proof Generation**
   - Generate witness from product data
   - Create ZK proof using Groth16
   - Verify proof on-chain

3. **On-chain Verification**
   - Smart contract verifies ZK proof
   - Mints NFT upon successful verification
   - Records product launch on-chain

## 📱 Usage

1. Connect your Web3 wallet
2. Enter product details and Twitter handle
3. Passes the product details through the ZK-SNARK circuit.
4. Securely stores the product details on IPFS.
5. Mint your Product NFT with Twitter verification


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.




