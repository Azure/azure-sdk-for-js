/*
  This sample demonstrates how the receiveMessages() function can be used to receive Event Hubs
  messages in a loop.

  Setup: Please run "sendMessages.ts" sample before running this to populate the Event Hubs
*/

import { EventHubClient, EventPosition } from "../src";

// Define connection string and related Event Hubs entity name here
const str = "";
const path = "";

async function main(): Promise<void> {
  const client = EventHubClient.createFromConnectionString(str, path);
  const partitionIds = await client.getPartitionIds();

  for (let i = 0; i < 10; i++) {
    const messages = await client.receiveBatch(partitionIds[0], 1, 5, {
      eventPosition: EventPosition.fromStart()
    });
    if (!messages.length) {
      console.log("No more messages to receive");
      break;
    }
    console.log(`Received message #${i}: ${messages[0].body}`);
  }
  await client.close();
}

main().catch(err => {
  console.log("Error occurred: ", err);
});
