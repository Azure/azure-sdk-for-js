/*
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the MIT Licence.

This sample demonstrates how to send/receive messages to/from session enabled queues/subscriptions
in Service Bus.

Setup: To run this sample, you would need session enabled Queue/Subscription.

See https://docs.microsoft.com/azure/service-bus-messaging/message-sessions to learn about
sessions in Service Bus.
*/

const { delay, ServiceBusClient, ReceiveMode } = require("@azure/service-bus");

// Load the .env file if it exists
require("dotenv").config();

// Define connection string and related Service Bus entity names here
// Ensure on portal.azure.com that queue/topic has Sessions feature enabled
const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING || "<connection string>";
const queueName = process.env.QUEUE_NAME || "<queue name>";

const listOfScientists = [
  {
    lastName: "Einstein",
    firstName: "Albert"
  },
  {
    lastName: "Heisenberg",
    firstName: "Werner"
  },
  {
    lastName: "Curie",
    firstName: "Marie"
  },
  {
    lastName: "Hawking",
    firstName: "Steven"
  },
  {
    lastName: "Newton",
    firstName: "Isaac"
  },
  {
    lastName: "Bohr",
    firstName: "Niels"
  },
  {
    lastName: "Faraday",
    firstName: "Michael"
  },
  {
    lastName: "Galilei",
    firstName: "Galileo"
  },
  {
    lastName: "Kepler",
    firstName: "Johannes"
  },
  {
    lastName: "Kopernikus",
    firstName: "Nikolaus"
  }
];

async function main() {
  const sbClient = ServiceBusClient.createFromConnectionString(connectionString);

  try {
    await sendMessage(sbClient, listOfScientists[0], "session-1");
    await sendMessage(sbClient, listOfScientists[1], "session-1");
    await sendMessage(sbClient, listOfScientists[2], "session-1");
    await sendMessage(sbClient, listOfScientists[3], "session-1");
    await sendMessage(sbClient, listOfScientists[4], "session-1");

    await sendMessage(sbClient, listOfScientists[5], "session-2");
    await sendMessage(sbClient, listOfScientists[6], "session-2");
    await sendMessage(sbClient, listOfScientists[7], "session-2");
    await sendMessage(sbClient, listOfScientists[8], "session-2");
    await sendMessage(sbClient, listOfScientists[9], "session-2");

    await receiveMessages(sbClient, "session-1");
    await receiveMessages(sbClient, "session-2");
  } finally {
    await sbClient.close();
  }
}

async function sendMessage(sbClient, scientist, sessionId) {
  // If sending to a Topic, use `createTopicClient` instead of `createQueueClient`
  const client = sbClient.createQueueClient(queueName);
  const sender = client.createSender();

  const message = {
    body: `${scientist.firstName} ${scientist.lastName}`,
    label: "Scientist",
    sessionId: sessionId
  };

  console.log(`Sending message: "${message.body}" to "${sessionId}"`);
  await sender.send(message);

  await client.close();
}

async function receiveMessages(ns, sessionId) {
  // If receiving from a Subscription, use `createSubscriptionClient` instead of `createQueueClient`
  const queueClient = ns.createQueueClient(queueName);
  const receiver = queueClient.createReceiver(ReceiveMode.peekLock, {
    sessionId: sessionId
  });

  const onMessage = async (brokeredMessage) => {
    console.log(`Received: ${brokeredMessage.sessionId} - ${brokeredMessage.body} `);
  };
  const onError = (err) => {
    console.log(">>>>> Error occurred: ", err);
  };
  receiver.registerMessageHandler(onMessage, onError);
  await delay(5000);

  await queueClient.close();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
