import dotenv from "dotenv";
import { ethers } from "hardhat";

dotenv.config();

async function main() {
  const SuperPlay = await ethers.getContractFactory("SuperPlay");
  const superPlay = await SuperPlay.deploy(
    "0x94f26B4c8AD12B18c12f38E878618f7664bdcCE2"
  );
  const Guard = await ethers.getContractFactory("SuperPlayGuard");
  const guard = await Guard.deploy();
  const Module = await ethers.getContractFactory("SuperPlayModule");
  const module = await Module.deploy(superPlay.address);

  await superPlay.deployed();
  await guard.deployed();

  console.log("SuperPlay deployed to:", superPlay.address);
  console.log("SuperPlayGuard deployed to:", guard.address);
  console.log("SuperPlayModule deployed to:", module.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
