/*
  This sample demonstrates how the scheduleMessage() function can be used to schedule messages to
  appear on a Service Bus Queue/Subscription at a later time.

  See https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-sequencing#scheduled-messages
  to learn about scheduling messages.
*/

import { Namespace, SendableMessageInfo, OnMessage, OnError } from "../../lib";
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
  const ns = Namespace.createFromConnectionString(connectionString);
  try {
    await sendScheduledMessages(ns);

    await receiveMessages(ns);
  } finally {
    await ns.close();
  }
}

// Scheduling messages to be sent after 10 seconds from now
async function sendScheduledMessages(ns: Namespace): Promise<void> {
  // If using Topics, use createTopicClient to send to a topic
  const client = ns.createQueueClient(queueName);

  const messages: SendableMessageInfo[] = listOfScientists.map((scientist) => ({
    body: `${scientist.firstName} ${scientist.lastName}`,
    label: "Scientist"
  }));

  const timeNowUtc = new Date(Date.now());
  const scheduledEnqueueTimeUtc = new Date(Date.now() + 10000);
  console.log(`>>>> Time now in UTC: ${timeNowUtc}`);
  console.log(
    `>>>> Messages will appear in Service Bus after 10 seconds at: ${scheduledEnqueueTimeUtc}`
  );

  await client.scheduleMessages(scheduledEnqueueTimeUtc, messages);
}

async function receiveMessages(ns: Namespace): Promise<void> {
  // If using Topics, use createSubscriptionClient to receive from a topic subscription
  const client = ns.createQueueClient(queueName);

  const onMessageHandler: OnMessage = async (brokeredMessage) => {
    numOfMessagesReceived++;
    console.log(`Received message: ${brokeredMessage.body} - ${brokeredMessage.label}`);

    await brokeredMessage.complete();
  };
  const onErrorHandler: OnError = (err) => {
    console.log("Error occurred: ", err);
  };

  let numOfMessagesReceived = 0;

  const receiveListenerFirst = client.receive(onMessageHandler, onErrorHandler);
  await delay(5000);
  await receiveListenerFirst.stop();
  console.log(`\nStarted looking up immediately, received ${numOfMessagesReceived} messages.`);

  await delay(5000);

  console.log(`\nStarted looking up after 10 seconds:`);

  const receiveListenerSecond = client.receive(onMessageHandler, onErrorHandler);
  await delay(5000);
  await receiveListenerSecond.stop();

  await client.close();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
