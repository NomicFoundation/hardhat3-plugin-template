import { network } from "hardhat";

const conn = await network.connect();

// This won't type unless you have the viem plugin in your config
console.log("conn?.viem?.myPlugin", conn?.viem?.myPlugin);
if (conn?.viem?.myPlugin) {
  console.log(
    "conn.viem.myPlugin.getAccounts()",
    await conn.viem.myPlugin.getAccounts()
  );
}

// This won't type unless you have the ethers plugin in your config
console.log("conn?.ethers?.myPlugin", conn?.ethers?.myPlugin);
if (conn?.ethers?.myPlugin) {
  console.log(
    "conn.ethers.myPlugin.getAccounts()",
    await conn.ethers.myPlugin.getAccounts()
  );
}

// Note that the plugin should support both ethers and viem, and none.
