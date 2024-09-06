// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to use the EventHubConsumerClient to receive messages from an IoT Hub.
 */

import { EventHubConsumerClient } from "@azure/event-hubs";

// Load the .env file if it exists
import "dotenv/config";

// Define IoT Hub Event Hubs-compatible connection string here.
// To find the correct connection string to use, visit:
// https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-devguide-messages-read-builtin
const connectionString = process.env["IOTHUB_EH_COMPATIBLE_CONNECTION_STRING"] || "";
const consumerGroup = process.env["EVENTHUB_CONSUMER_GROUP_NAME"] || "<your consumer group name>";

export async function main(): Promise<void> {
  console.log(`Running useWithIotHub sample`);
  const client = new EventHubConsumerClient(consumerGroup, connectionString);
  /*
   Refer to other samples, and place your code here to receive events using the above client.
   Please note that send operations are not supported when this client is used against an IotHub instance
  */
  await client.close();
  console.log(`Exiting useWithIotHub sample`);
}

main().catch((error) => {
  console.error("Error running sample:", error);
});
