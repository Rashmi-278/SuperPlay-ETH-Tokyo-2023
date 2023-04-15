import dotenv from "dotenv";
import { ethers } from "hardhat";

dotenv.config();

async function main() {
  const SuperPlay = await ethers.getContractFactory("SuperPlay");
  const superPlay = await SuperPlay.deploy(
    "0x94f26B4c8AD12B18c12f38E878618f7664bdcCE2"
  );

  await superPlay.deployed();

  console.log("SuperPlay deployed to:", superPlay.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
