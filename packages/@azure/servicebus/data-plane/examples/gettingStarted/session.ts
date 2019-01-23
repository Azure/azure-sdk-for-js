/*
  This sample demonstrates how to send/receive messages to/from session enabled queues/subscriptions
  in Service Bus.

  Setup: To run this sample, you would need session enabled Queue/Subscription.

  See https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-sessions to learn about
  sessions in Service Bus.
*/

import { OnSessionMessage, OnError, delay, Namespace } from "../../lib";

// Define connection string and related Service Bus entity names here
// Ensure on portal.azure.com that queue/topic has Sessions feature enabled
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
    await sendMessage(ns, listOfScientists[0], "session-1");
    await sendMessage(ns, listOfScientists[1], "session-1");
    await sendMessage(ns, listOfScientists[2], "session-1");
    await sendMessage(ns, listOfScientists[3], "session-1");
    await sendMessage(ns, listOfScientists[4], "session-1");

    await sendMessage(ns, listOfScientists[5], "session-2");
    await sendMessage(ns, listOfScientists[6], "session-2");
    await sendMessage(ns, listOfScientists[7], "session-2");
    await sendMessage(ns, listOfScientists[8], "session-2");
    await sendMessage(ns, listOfScientists[9], "session-2");

    await receiveMessages(ns);
  } finally {
    await ns.close();
  }
}

async function sendMessage(ns: Namespace, scientist: any, sessionId: string): Promise<void> {
  // If using Topics, use createTopicClient to send to a topic
  const client = ns.createQueueClient(queueName);

  const message = {
    body: `${scientist.firstName} ${scientist.lastName}`,
    label: "Scientist",
    sessionId: sessionId
  };

  console.log(`Sending message: "${message.body}" to "${sessionId}"`);
  await client.send(message);

  await client.close();
}

async function receiveMessages(ns: Namespace): Promise<void> {
  // If using Topics, use createSubscriptionClient to receive from a topic subscription
  const client = ns.createQueueClient(queueName);

  const onMessage: OnSessionMessage = async (messageSession, brokeredMessage) => {
    console.log(`Received: ${brokeredMessage.sessionId} - ${brokeredMessage.body} `);
  };
  const onError: OnError = (err) => {
    console.log(">>>>> Error occurred: ", err);
  };
  await client.receiveMessagesFromSessions(onMessage, onError);
  await delay(5000);

  await client.close();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
