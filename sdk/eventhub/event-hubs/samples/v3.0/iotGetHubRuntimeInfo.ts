/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

 This sample demonstrates how to use getHubRuntimeInformation() and
 getPartitionInformation() to get information about the Iot Hub instance.
*/
import { EventHubClient } from "@azure/event-hubs";

// Define IoT Hub connection string here
const connectionString = "";

async function main(): Promise<void> {
  const client = await EventHubClient.createFromIotHubConnectionString(connectionString);

  const info = await client.getProperties();
  console.log("RuntimeInfo: ", info);

  const pInfo = await client.getPartitionInformation(info.partitionIds[0]);
  console.log("Partition Information: ", pInfo);

  await client.close();
}

main().catch(err => {
  console.log("Error occurred: ", err);
});
