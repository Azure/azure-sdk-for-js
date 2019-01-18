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

async function main(): Promise<void> {
  const ns = Namespace.createFromConnectionString(connectionString);
  try {
    await sendMessages(ns, "session-1");
    await sendMessages(ns, "session-2");
    await sendMessages(ns, "session-3");
    await sendMessages(ns, "session-4");

    await receiveMessages(ns);
  } finally {
    await ns.close();
  }
}

async function sendMessages(ns: Namespace, sessionId: string): Promise<void> {
  // If using Topics, use createTopicClient to send to a topic
  const client = ns.createQueueClient(queueName);
  const data = [
    { step: 1, title: "Shop" },
    { step: 2, title: "Unpack" },
    { step: 3, title: "Prepare" },
    { step: 4, title: "Cook" },
    { step: 5, title: "Eat" }
  ];

  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const message = {
      sessionId: sessionId,
      body: `${element.step} ${element.title}`,
      label: "RecipeStep"
    };

    console.log(`Message sent: ${message.body} SessionId : ${sessionId}`);
    await client.send(message);
  }
  await client.close();
}

async function receiveMessages(ns: Namespace): Promise<void> {
  // If using Topics, use createSubscriptionClient to receive from a topic subscription
  const client = ns.createQueueClient(queueName);

  const onMessage: OnSessionMessage = async (messageSession, brokeredMessage) => {
    console.log(
      `Message received: ${brokeredMessage.body} SessionId : ${brokeredMessage.sessionId}`
    );
  };
  const onError: OnError = (err) => {
    console.log(">>>>> Error occurred: ", err);
  };
  await client.receiveMessagesFromSessions(onMessage, onError);
  await delay(10000);

  await client.close();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
