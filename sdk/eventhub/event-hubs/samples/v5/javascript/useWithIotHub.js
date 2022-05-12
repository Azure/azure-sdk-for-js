// Copyright (c) Microsoft Corporation.
// Licensed under the MIT Licence.

/**
 * @summary Demonstrates how to use the EventHubConsumerClient to receive messages from an IoT Hub.
 */

const { EventHubConsumerClient } = require("@azure/event-hubs");

// Load the .env file if it exists
require("dotenv").config();

// Define IoT Hub Event Hubs-compatible connection string here.
// To find the correct connection string to use, visit:
// https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-devguide-messages-read-builtin
const connectionString = process.env["IOTHUB_EH_COMPATIBLE_CONNECTION_STRING"] || "";
const consumerGroup = process.env["CONSUMER_GROUP_NAME"] || "";

async function main() {
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

module.exports = { main };
