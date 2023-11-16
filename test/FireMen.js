import { expect } from "chai";
import hardhat from "hardhat";
const { ethers } = hardhat;

// const { expect } = require("chai");
// const { ethers } = require("hardhat");

describe("FireMen", function () {
  it("should mint and transfer and nft to someone", async function () {
    const [owner, account1, account2, account3, account4] =
      await hardhat.ethers.getSigners();

    const FireMen = await hardhat.ethers.getContractFactory("FireMen");
    const firemen = await FireMen.deploy(owner.address);

    expect(await firemen.balanceOf(account1.address)).to.equal(0);

    const tx = await firemen.payToMint(account1.address, "testuri", {
      value: ethers.parseEther("0.3"),
    });

    expect(await firemen.balanceOf(account1.address)).to.equal(1);

    // now send the token to account2;

    const newTokenId = 0;

    const tokenOwner = await firemen.ownerOf(newTokenId);
    expect(tokenOwner).to.equal(account1.address);

    // await firemen.connect(account1).approve(account2.address, newTokenId);
    await firemen
      .connect(account1)
      .transferFrom(account1.address, account2.address, newTokenId);

    // check balance of both accounts;
    expect(await firemen.balanceOf(account1.address)).to.equal(0);
    expect(await firemen.balanceOf(account2.address)).to.equal(1);
  });
});
