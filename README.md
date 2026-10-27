# BlockVote — Blockchain Voting System

A blockchain-based voting application built using Solidity, Hardhat, JavaScript, and MetaMask. The project demonstrates how smart contracts can manage candidates, record votes, and display election results transparently.

> **Note:** This is an educational prototype for demonstration purposes only. It is not suitable for real public elections or secure identity verification.

## Overview

Traditional voting systems can face challenges involving transparency, record integrity, and trust in vote counting. BlockVote explores how blockchain technology and smart contracts can provide a transparent and verifiable way to record votes.

The application allows an administrator to manage candidates and control an election, while voters connect their MetaMask wallets to cast votes. Vote counts are retrieved directly from the deployed smart contract.

## Features

- **MetaMask Integration:** Connect an Ethereum-compatible wallet.
- **Demo OTP Verification:** Demonstrates a basic voter verification flow using an OTP displayed on the screen.
- **Candidate Management:** Allows the contract owner to add candidates.
- **Election Controls:** Start or stop an election through the smart contract.
- **One Vote Per Wallet:** Prevents the same wallet address from voting more than once.
- **Blockchain Vote Recording:** Records votes through smart contract transactions.
- **Results Dashboard:** Displays candidate vote counts and visual progress bars.
- **Admin Authorization:** Restricts candidate management and election controls to the contract owner.

## Tech Stack

| Category | Technologies |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Smart Contracts | Solidity 0.8.24 |
| Blockchain Development | Hardhat |
| Wallet Integration | MetaMask |
| Ethereum Interaction | ethers.js 6 |
| Development Tools | Node.js, npm, Git, GitHub |

## Project Structure

```text
Blockchain-Voting-System/
├── contracts/
│   └── Voting.sol
├── scripts/
│   └── deploy.js
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── hardhat.config.js
├── package.json
└── README.md
```

## How It Works
<img width="975" height="650" alt="image" src="https://github.com/user-attachments/assets/ec36bbb5-2467-44f1-ae88-b98486db889e" />
<img width="596" height="728" alt="image" src="https://github.com/user-attachments/assets/fcce5966-ed75-427e-a401-39cd2d2cbb21" />
<img width="823" height="304" alt="image" src="https://github.com/user-attachments/assets/1d3dc239-7e46-4889-92b7-025be88738f1" />
<img width="932" height="340" alt="image" src="https://github.com/user-attachments/assets/66c73a6e-36d5-4772-ad3a-015dd10a0190" />

1. The administrator deploys the voting smart contract to a local Hardhat blockchain.
2. The administrator connects MetaMask and adds candidates.
3. The administrator starts the election.
4. A voter connects a wallet and completes the demo OTP verification.
5. The voter selects a candidate and confirms the transaction in MetaMask.
6. The smart contract records the vote and prevents that wallet from voting again.
7. The results dashboard retrieves and displays the vote counts from the contract.

## Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/)
- [MetaMask](https://metamask.io/)
- A code editor such as Visual Studio Code

Basic knowledge of JavaScript, Solidity, and blockchain concepts is helpful.

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
cd YOUR-REPOSITORY
```

Replace the repository URL with your actual GitHub repository URL.

### 2. Install dependencies

```bash
npm install
```

### 3. Compile the smart contract

```bash
npx hardhat compile
```

### 4. Start the local blockchain

Open a terminal and run:

```bash
npx hardhat node
```

Keep this terminal running. Hardhat will display test accounts and their private keys.

### 5. Deploy the smart contract

Open a second terminal in the project directory and run:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

Copy the deployed contract address printed in the terminal.

### 6. Configure the frontend

Open `frontend/app.js` and replace the placeholder value:

```javascript
const CONTRACT_ADDRESS = "PASTE_DEPLOYED_CONTRACT_ADDRESS_HERE";
```

with your deployed contract address.

### 7. Configure MetaMask

Add a custom network using these settings:

- **Network Name:** Hardhat Local
- **RPC URL:** `http://127.0.0.1:8545`
- **Chain ID:** `31337`
- **Currency Symbol:** ETH

For local testing, import one of the test accounts displayed by Hardhat into MetaMask. Use only local test accounts and never use real funds or expose private keys.

### 8. Start the frontend

Open a terminal and run:

```bash
npm run frontend
```

Alternatively, you can run:

```bash
npx http-server frontend -p 5500 -c-1
```

Open the application at:

http://127.0.0.1:5500

## Demo Instructions

1. Connect MetaMask using the first Hardhat test account, which is the contract owner when deployed using the provided script.
2. Add two or three candidates through the admin panel.
3. Start the election.
4. Connect a different Hardhat test account for voting.
5. Enter a demo Voter ID and mobile number.
6. Click **Send Demo OTP** and use the OTP displayed on the screen.
7. Verify the voter, select a candidate, and cast the vote.
8. Confirm the transaction in MetaMask.
9. Refresh the results dashboard to see the updated counts.

## Smart Contract

The `Voting.sol` contract includes:

- `addCandidate()` — Adds a candidate; owner-only.
- `startElection()` — Activates the election; owner-only.
- `stopElection()` — Stops the election; owner-only.
- `vote()` — Records a vote if the election is active and the wallet has not already voted.
- `getCandidates()` — Retrieves candidate details and vote counts.
- `getCandidateCount()` — Returns the number of candidates.
- `hasVoted` — Tracks whether a wallet address has voted.
- `owner` and `electionActive` — Expose the contract owner and election status.

## Security Considerations and Limitations

- The OTP is generated and displayed in the browser. It is a demonstration feature, not secure identity verification.
- The smart contract limits voting to one vote per wallet, not one vote per real person. Users could create multiple wallets.
- Votes and wallet activity on a public blockchain may be visible. This implementation does not provide ballot secrecy.
- Stopping the election prevents further votes but does not make the contract immutable against all possible design limitations.
- The application has not been audited for production security.
- Never enter real Aadhaar details, sensitive personal information, or real voting credentials.

## Future Enhancements

- Integrate a secure external identity verification system.
- Improve privacy and ballot confidentiality.
- Add election scheduling and eligibility management.
- Improve error handling and transaction status notifications.
- Add automated smart contract tests.
- Deploy to a suitable blockchain testnet for demonstration.
- Improve the interface and accessibility of the results dashboard.

## Learning Outcomes

This project demonstrates practical exposure to:

- Solidity smart contract development.
- Local blockchain deployment using Hardhat.
- Connecting frontend applications to Ethereum-compatible wallets.
- Blockchain transactions and event-driven functionality.
- Smart contract access control and vote-count management.
- Building a web interface for a decentralized application.

## License

This project uses the MIT License if distributed under that license. See the `LICENSE` file in the repository for the applicable terms.

## Author

**Rutuja Sunil Bhosale**

- GitHub: [rutujabhosale1337](https://github.com/rutujabhosale1337)
- LinkedIn: [Rutuja Bhosale](https://www.linkedin.com/in/rutuja-bhosale-26b3a5376/)
