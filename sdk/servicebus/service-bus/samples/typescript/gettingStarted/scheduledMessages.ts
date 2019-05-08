/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how the scheduleMessage() function can be used to schedule messages to
  appear on a Service Bus Queue/Subscription at a later time.

  See https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-sequencing#scheduled-messages
  to learn about scheduling messages.
*/

import {
  ServiceBusClient,
  ReceiveMode,
  SendableMessageInfo,
  OnMessage,
  OnError
} from "@azure/service-bus";
import { delay } from "rhea-promise";

// Define connection string and related Service Bus entity names here
const connectionString = "";
const queueName = "";

const listOfScientists = [
  { lastName: "Einstein", firstName: "Albert" },
  { lastName: "Heisenberg", firstName: "Werner" },
  { lastName: "Curie", firstName: "Marie" },
  { lastName: "Hawking", firstName: "Steven" },
  { lastName: "Newton", firstName: "Isaac" },
  { lastName: "Bohr", firstName: "Niels" },
  { lastName: "Faraday", firstName: "Michael" },
  { lastName: "Galilei", firstName: "Galileo" },
  { lastName: "Kepler", firstName: "Johannes" },
  { lastName: "Kopernikus", firstName: "Nikolaus" }
];

async function main(): Promise<void> {
  const ns = ServiceBusClient.createFromConnectionString(connectionString);
  try {
    await sendScheduledMessages(ns);

    await receiveMessages(ns);
  } finally {
    await ns.close();
  }
}

// Scheduling messages to be sent after 10 seconds from now
async function sendScheduledMessages(ns: ServiceBusClient): Promise<void> {
  // If sending to a Topic, use `createTopicClient` instead of `createQueueClient`
  const client = ns.createQueueClient(queueName);
  const sender = client.createSender();

  const messages: SendableMessageInfo[] = listOfScientists.map((scientist) => ({
    body: `${scientist.firstName} ${scientist.lastName}`,
    label: "Scientist"
  }));

  const timeNowUtc = new Date(Date.now());
  const scheduledEnqueueTimeUtc = new Date(Date.now() + 10000);
  console.log(`Time now in UTC: ${timeNowUtc}`);
  console.log(
    `Messages will appear in Service Bus after 10 seconds at: ${scheduledEnqueueTimeUtc}`
  );

  await sender.scheduleMessages(scheduledEnqueueTimeUtc, messages);
}

async function receiveMessages(ns: ServiceBusClient): Promise<void> {
  // If receiving from a Subscription, use `createSubscriptionClient` instead of `createQueueClient`
  const client = ns.createQueueClient(queueName);

  let numOfMessagesReceived = 0;
  const onMessageHandler: OnMessage = async (brokeredMessage) => {
    numOfMessagesReceived++;
    console.log(`Received message: ${brokeredMessage.body} - ${brokeredMessage.label}`);

    await brokeredMessage.complete();
  };
  const onErrorHandler: OnError = (err) => {
    console.log("Error occurred: ", err);
  };

  console.log(`\nStarting receiver immediately at ${new Date(Date.now())}`);

  let receiver = client.createReceiver(ReceiveMode.peekLock);
  receiver.registerMessageHandler(onMessageHandler, onErrorHandler);
  await delay(5000);
  await receiver.close();
  console.log(`Received ${numOfMessagesReceived} messages.`);

  await delay(5000);
  receiver = client.createReceiver(ReceiveMode.peekLock);

  console.log(`\nStarting receiver at ${new Date(Date.now())}`);

  receiver.registerMessageHandler(onMessageHandler, onErrorHandler);
  await delay(5000);
  await receiver.close();
  console.log(`Received ${numOfMessagesReceived} messages.`);

  await client.close();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
