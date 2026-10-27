# BlockVote — Blockchain Voting System

College/demo project using HTML/CSS/JavaScript, Solidity, Hardhat and MetaMask.

## Features
- Voter ID + demo OTP verification
- MetaMask wallet authentication
- Admin candidate management
- Start/stop election
- One vote per wallet
- Blockchain vote counting
- Result dashboard

## Run
1. Install Node.js and MetaMask.
2. In this folder run:
   `npm install`
3. Compile:
   `npx hardhat compile`
4. Start local blockchain in Terminal 1:
   `npx hardhat node`
5. In Terminal 2 deploy:
   `npx hardhat run scripts/deploy.js --network localhost`
6. Copy the printed contract address into:
   `frontend/app.js`
   replacing `PASTE_DEPLOYED_CONTRACT_ADDRESS_HERE`
7. Serve frontend:
   `npx http-server frontend -p 5500 -c-1`
8. Open:
   `http://127.0.0.1:5500`

## MetaMask
Add a custom network:
- Network name: Hardhat Local
- RPC URL: http://127.0.0.1:8545
- Chain ID: 31337
- Currency symbol: ETH

Import one of the test accounts/private keys printed by `npx hardhat node`.

## Demo flow
1. Connect MetaMask using the first Hardhat account (admin).
2. Add 2–3 candidates.
3. Start election.
4. Use another Hardhat account for voter.
5. Enter any demo Voter ID/mobile and use the OTP shown on screen.
6. Select candidate and cast vote.
7. Refresh results.

This is an educational prototype, not a real election system. Do not enter real Aadhaar or other sensitive identity data.
