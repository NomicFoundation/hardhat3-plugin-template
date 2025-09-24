import { network } from "hardhat";

const connection = await network.connect();

console.log("connection.myAccount", connection.myAccount);
