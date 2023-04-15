import { Framework } from "@superfluid-finance/sdk-core";
import { expect } from "chai";
import dotenv from "dotenv";
import { constants } from "ethers";
import { network, ethers } from "hardhat";

dotenv.config();

const RECEIVER = "0xeb5bB1e1130e607D8f44B2295C3Bc0581940873a";

describe("SuperPlay", function () {
  async function deployERC20() {
    const MockToken = await ethers.getContractFactory("MockToken");
    const mockToken = await MockToken.deploy();
    return await mockToken.deployed();
  }
  async function deploySuperPlay() {
    const SuperPlay = await ethers.getContractFactory("SuperPlay");
    const superPlay = await SuperPlay.deploy(
      process.env.SUPERFLUID_TOKEN_FACTORY_ADDRESS!
    );
    return await superPlay.deployed();
  }
  async function getSuperFluidSDK() {
    const sf = await Framework.create({
      chainId: (await ethers.provider.getNetwork()).chainId,
      provider: ethers.provider,
      resolverAddress: "0x3710AB3fDE2B61736B8BB0CE845D6c61F667a78E",
    });
    return sf;
  }

  it("Should deploy SuperPlay", async function () {
    await deploySuperPlay();
  });

  it("Should create a game", async function () {
    const superPlay = await deploySuperPlay();
    const token = await deployERC20();
    const tx = await superPlay.createGame(token.address, 100, RECEIVER);
    const rec = await tx.wait();
    expect(
      rec.events?.filter((evt) => evt.event === "GameCreated").length
    ).to.be.equal(1);
  });

  it("Shoud return a game", async function () {
    const superPlay = await deploySuperPlay();
    const token = await deployERC20();
    await superPlay.createGame(token.address, 100, RECEIVER);

    await superPlay.games(0);
  });

  it("Should register and unreigster for a game", async function () {
    const superPlay = await deploySuperPlay();
    const token = await deployERC20();
    await superPlay.createGame(token.address, 100, RECEIVER);
    const { token: superTokenAddress } = await superPlay.games(0);

    const sf = await getSuperFluidSDK();
    await token.approve(superTokenAddress, constants.MaxUint256);
    const superToken = await sf.loadSuperToken(superTokenAddress);
    const upgradeOp = superToken.upgrade({
      amount: "1000000000000000000000000",
    });
    const approveOp = superToken.updateFlowOperatorPermissions({
      flowOperator: superPlay.address,
      permissions: 7,
      flowRateAllowance: "10000",
    });
    const [signer] = await ethers.getSigners();
    await upgradeOp.exec(signer);
    await approveOp.exec(signer);

    await superPlay.registerForGame(0);
    await network.provider.request({
      method: "evm_increaseTime",
      params: ["0x1000"],
    });
    await superPlay.unregisterForGame(0);
  });
});
