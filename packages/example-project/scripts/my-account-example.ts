import { network } from "hardhat";

const connection = await network.create();

console.log("connection.myAccount:", connection.myAccount);
