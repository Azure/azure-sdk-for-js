/*
  This sample demonstrates how the receive() function can be used to receive Event Hubs messages
  in a stream.

  Setup: Please run "sendMessages.ts" sample before running this to populate the Event Hubs
*/

import { EventHubClient, EventPosition, OnMessage, OnError, MessagingError, delay, EventData } from "../src";

// Define connection string and related Event Hubs entity name here
const str = "";
const path = "";

async function main(): Promise<void> {
  const client = EventHubClient.createFromConnectionString(str, path);
  const partitionIds = await client.getPartitionIds();

  const onMessageHandler: OnMessage = async (brokeredMessage: EventData) => {
    console.log(`Received message: ${brokeredMessage.body}`);
  };
  const onErrorHandler: OnError = (err: MessagingError | Error) => {
    console.log("Error occurred: ", err);
  };

  const rcvHandler = client.receive(partitionIds[0], onMessageHandler, onErrorHandler, {
    eventPosition: EventPosition.fromStart()
  });

  // Waiting long enough before closing the receiver to receive messages
  await delay(5000);
  await rcvHandler.stop();
  await client.close();
}

main().catch(err => {
  console.log("Error occurred: ", err);
});
