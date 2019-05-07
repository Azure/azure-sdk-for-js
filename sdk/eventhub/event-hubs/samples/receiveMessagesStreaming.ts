/*
  This sample demonstrates how the receive() function can be used to receive Event Hubs messages
  in a stream.

  If your Event Hubs instance doesn't have any messages, then please run "sendMesages.ts" sample
  to populate Event Hubs before running this sample.
*/

import { EventHubClient, EventPosition, OnMessage, OnError, MessagingError, delay, EventData } from "@azure/event-hubs";

// Define connection string and related Event Hubs entity name here
const connectionString = "";
const eventHubsName = "";

async function main(): Promise<void> {
  const client = EventHubClient.createFromConnectionString(connectionString, eventHubsName);
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
