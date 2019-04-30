/*
  This sample demonstrates how to get IoT Hub information.
*/
import { EventHubClient } from "../src";

// Define IoT Hub connection string here
const str = "";

async function main(): Promise<void> {
  const client = await EventHubClient.createFromIotHubConnectionString(str);

  const info = await client.getHubRuntimeInformation();
  console.log("RuntimeInfo: ", info);

  const pInfo = await client.getPartitionInformation(info.partitionIds[0]);
  console.log("Partition Information: ", pInfo);

  await client.close();
}

main().catch(err => {
  console.log("Error occurred: ", err);
});
