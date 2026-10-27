const hre = require("hardhat");

async function main() {
  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy();
  await voting.waitForDeployment();

  console.log("Voting contract deployed to:", await voting.getAddress());
  console.log("Admin/owner:", (await hre.ethers.getSigners())[0].address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});