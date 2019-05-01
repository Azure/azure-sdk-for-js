/*
  This sample demonstrates how to use getHubRuntimeInformation() and
  getPartitionInformation() to get information about the Event Hubs instance.
*/

import { EventHubClient } from "@azure/event-hubs";

// Define connection string and related Event Hubs entity name here
const connectionString = "";
const eventHubsName = "";

async function main(): Promise<void> {
  const client = EventHubClient.createFromConnectionString(connectionString, eventHubsName);

  const info = await client.getHubRuntimeInformation();
  console.log("RuntimeInfo: ", info);

  const pInfo = await client.getPartitionInformation(info.partitionIds[0]);
  console.log("Partition Information: ", pInfo);

  await client.close();
}

main().catch(err => {
  console.log("Error occurred: ", err);
});
