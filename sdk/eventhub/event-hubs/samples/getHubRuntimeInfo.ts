/*
  This sample demonstrates how to get Event Hubs information.
*/

import { EventHubClient } from "../src";

// Define connection string and related Event Hubs entity name here
const str = "";
const path = "";

async function main(): Promise<void> {
  const client = EventHubClient.createFromConnectionString(str, path);

  const info = await client.getHubRuntimeInformation();
  console.log("RuntimeInfo: ", info);

  const pInfo = await client.getPartitionInformation(info.partitionIds[0]);
  console.log("Partition Information: ", pInfo);

  await client.close();
}

main().catch(err => {
  console.log("Error occurred: ", err);
});
