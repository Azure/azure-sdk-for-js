/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

 This sample demonstrates how to use the EventHubClient with an IotHub instance
*/
import { EventHubClient } from "@azure/event-hubs";

// Define IoT Hub connection string here
const connectionString = "";

async function main(): Promise<void> {
  const client = await EventHubClient.createFromIotHubConnectionString(connectionString);
  /*
   Refer to other samples, and place your code here to send/receive events using the above client
  */
  await client.close();
}

main().catch(err => {
  console.log("Error occurred: ", err);
});
