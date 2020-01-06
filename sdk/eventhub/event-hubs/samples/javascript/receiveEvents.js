// Copyright (c) Microsoft Corporation.
// Licensed under the MIT Licence.

/*
  This sample demonstrates how to use the EventHubConsumerClient to process events from all partitions
  of a consumer group in an Event Hubs instance.

  If your Event Hub instance doesn't have any events, then please run "sendEvents.ts" sample
  to populate it before running this sample.

  Note: If you are using version 2.1.0 or lower of @azure/event-hubs library, then please use the samples at
  https://github.com/Azure/azure-sdk-for-js/tree/%40azure/event-hubs_2.1.0/sdk/eventhub/event-hubs/samples instead.
*/

const { EventHubConsumerClient } = require("@azure/event-hubs");

// Load the .env file if it exists
require("dotenv").config();

const connectionString = process.env["EVENTHUB_CONNECTION_STRING"] || "";
const eventHubName = process.env["EVENTHUB_NAME"] || "";
const consumerGroup = process.env["CONSUMER_GROUP_NAME"] || "";

async function main() {
  console.log(`Running receiveEvents sample`);

  const consumerClient = new EventHubConsumerClient(consumerGroup, connectionString, eventHubName);

  const subscription = consumerClient.subscribe({
    // The callback where you add your code to process incoming events
    processEvents: async (events, context) => {
      for (const event of events) {
        console.log(
          `Received event: '${event.body}' from partition: '${context.partitionId}' and consumer group: '${context.consumerGroup}'`
        );
      }
    },
    processError: async (err, context) => {
      console.log(`Error : ${err}`);
    }
  });

  // Wait for a bit before cleaning up the sample
  setTimeout(async () => {
    await subscription.close();
    await consumerClient.close();
    console.log(`Exiting receiveEvents sample`);
  }, 30 * 1000);
}

module.exports = { main };

main().catch((error) => {
  console.error("Error running sample:", error);
});
