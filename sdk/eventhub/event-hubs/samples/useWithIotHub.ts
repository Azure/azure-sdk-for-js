/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

 This sample demonstrates how to use the EventHubClient with an IotHub instance
*/
import { EventHubClient } from "@azure/event-hubs";

// Define IoT Hub connection string here
const connectionString = "";

async function main(): Promise<void> {
  const client = new EventHubClient(connectionString);
  /*
   Refer to other samples, and place your code here to receive events using the above client.
   Please note that send operations are not supported when this client is used against an IotHub instance
  */
  await client.close();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
