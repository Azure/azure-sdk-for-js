/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  **NOTE**: If you are using version 1.1.x or lower, then please use the link below:
  https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/servicebus/service-bus/samples-v1
  
  This sample demonstrates how the scheduleMessage() function can be used to schedule messages to
  appear on a Service Bus Queue/Subscription at a later time.

  See https://docs.microsoft.com/azure/service-bus-messaging/message-sequencing#scheduled-messages
  to learn about scheduling messages.
*/

const { delay, ServiceBusClient } = require("@azure/service-bus");

// Load the .env file if it exists
require("dotenv").config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING || "<connection string>";
const queueName = process.env.QUEUE_NAME || "<queue name>";
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

async function main() {
  const sbClient = new ServiceBusClient(connectionString);
  try {
    await sendScheduledMessages(sbClient);

    await receiveMessages(sbClient);
  } finally {
    await sbClient.close();
  }
}

// Scheduling messages to be sent after 10 seconds from now
async function sendScheduledMessages(sbClient) {
  // createSender() handles sending to a queue or a topic
  const sender = sbClient.createSender(queueName);

  const messages = listOfScientists.map((scientist) => ({
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

async function receiveMessages(sbClient) {
  // If receiving from a subscription you can use the createReceiver(topic, subscription) overload
  // instead.
  let queueReceiver = sbClient.createReceiver(queueName);

  let numOfMessagesReceived = 0;
  const processMessage = async (brokeredMessage) => {
    numOfMessagesReceived++;
    console.log(`Received message: ${brokeredMessage.body} - ${brokeredMessage.label}`);
    await brokeredMessage.complete();
  };
  const processError = async (err) => {
    console.log("Error occurred: ", err);
  };

  console.log(`\nStarting receiver immediately at ${new Date(Date.now())}`);
  queueReceiver.subscribe({
    processMessage,
    processError
  });
  await delay(5000);
  await queueReceiver.close();
  console.log(`Received ${numOfMessagesReceived} messages.`);

  await delay(5000);

  console.log(`\nStarting receiver at ${new Date(Date.now())}`);
  queueReceiver = sbClient.createReceiver(queueName);
  queueReceiver.subscribe({
    processMessage,
    processError
  });
  await delay(5000);
  await queueReceiver.close();
  console.log(`Received ${numOfMessagesReceived} messages.`);

  await sbClient.close();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
