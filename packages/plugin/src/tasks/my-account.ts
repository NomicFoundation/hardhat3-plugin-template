import { HardhatRuntimeEnvironment } from "hardhat/types/hre";

interface MyAccountTaskArguments {
  title: string;
}

export default async function (
  taskArguments: MyAccountTaskArguments,
  hre: HardhatRuntimeEnvironment,
) {
  const conn = await hre.network.connect();
  console.log(taskArguments.title);
  console.log(conn.myAccount);
}
