import { ethers } from "hardhat";
import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);

describe("SuperPlayGuard", function () {
  it("Should allow a contract", async function () {
    const SuperPlayGuard = await ethers.getContractFactory("SuperPlayGuard");
    const superPlayGuard = await SuperPlayGuard.deploy();
    await superPlayGuard.deployed();

    const MockContract = await ethers.getContractFactory("MockContract");
    const mockContract = await MockContract.deploy();
    await mockContract.deployed();

    await superPlayGuard.approveContract(mockContract.address);
    await superPlayGuard.checkTransaction(
      mockContract.address,
      0,
      mockContract.interface.getSighash("foo()"),
      0,
      0,
      0,
      "0x0000000000000000000000000000000000000000",
      "0x0000000000000000000000000000000000000000",
      "0x0000000000000000000000000000000000000000",
      "0x0000000000000000000000000000000000000000",
      "0x0000000000000000000000000000000000000000"
    );
  });

  it("Should allow a function", async function () {
    const SuperPlayGuard = await ethers.getContractFactory("SuperPlayGuard");
    const superPlayGuard = await SuperPlayGuard.deploy();
    await superPlayGuard.deployed();

    const MockContract = await ethers.getContractFactory("MockContract");
    const mockContract = await MockContract.deploy();
    await mockContract.deployed();

    const selector = mockContract.interface.getSighash("foo()");

    await superPlayGuard.approveFunction(mockContract.address, selector);
    await superPlayGuard.checkTransaction(
      mockContract.address,
      0,
      selector,
      0,
      0,
      0,
      "0x0000000000000000000000000000000000000000",
      "0x0000000000000000000000000000000000000000",
      "0x0000000000000000000000000000000000000000",
      "0x0000000000000000000000000000000000000000",
      "0x0000000000000000000000000000000000000000"
    );
  });

  it("Should reject a contract", async function () {
    const SuperPlayGuard = await ethers.getContractFactory("SuperPlayGuard");
    const superPlayGuard = await SuperPlayGuard.deploy();
    await superPlayGuard.deployed();

    const MockContract = await ethers.getContractFactory("MockContract");
    const mockContract = await MockContract.deploy();
    await mockContract.deployed();

    expect(
      superPlayGuard.checkTransaction(
        mockContract.address,
        0,
        mockContract.interface.getSighash("foo()"),
        0,
        0,
        0,
        "0x0000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000"
      )
    ).to.be.rejected;
  });

  it("Should reject a function", async function () {
    const SuperPlayGuard = await ethers.getContractFactory("SuperPlayGuard");
    const superPlayGuard = await SuperPlayGuard.deploy();
    await superPlayGuard.deployed();

    const MockContract = await ethers.getContractFactory("MockContract");
    const mockContract = await MockContract.deploy();
    await mockContract.deployed();

    const fooSelector = mockContract.interface.getSighash("foo()");
    const barSelector = mockContract.interface.getSighash("bar()"); // not apporved
    await superPlayGuard.approveFunction(mockContract.address, fooSelector);

    expect(
      superPlayGuard.checkTransaction(
        mockContract.address,
        0,
        barSelector,
        0,
        0,
        0,
        "0x0000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000"
      )
    ).to.be.rejected;
  });
});
