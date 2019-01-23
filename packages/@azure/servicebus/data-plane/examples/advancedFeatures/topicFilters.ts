/*
  This sample illustrates how to use topic subscriptions and filters for splitting
  up a message stream into multiple streams based on message properties.

  In this sample, we will send messages with property "priority" of 1 and 2 to two separate subscriptions,
  and the rest of the messages to the third subscription.

  Setup: To run this sample, you would need a Topic with 3 subscriptions.

  See https://docs.microsoft.com/en-us/azure/service-bus-messaging/topic-filters to learn aboout
  Topic filters and actions.
*/

import { Namespace, SendableMessageInfo, SubscriptionClient } from "../../lib";

// Define connection string and related Service Bus entity names here
const connectionString = "";
const topicName = "";
const subscriptionName1 = "";
const subscriptionName2 = "";
const subscriptionName3 = "";

async function main(): Promise<void> {
  const ns = Namespace.createFromConnectionString(connectionString);
  try {
    await addRules(ns);

    await sendMessages(ns);

    await receiveMessages(ns);
  } finally {
    await ns.close();
  }
}

// Adds Rules on subscriptions to route messages from a topic to different subscriptions
async function addRules(ns: Namespace): Promise<void> {
  const subscription1Client = ns.createSubscriptionClient(topicName, subscriptionName1);
  const subscription2Client = ns.createSubscriptionClient(topicName, subscriptionName2);
  const subscription3Client = ns.createSubscriptionClient(topicName, subscriptionName3);

  // The default rule on the subscription allows all messages in.
  // So, remove existing rules before adding new ones
  await removeAllRules(subscription1Client);
  await removeAllRules(subscription2Client);
  await removeAllRules(subscription3Client);

  await subscription1Client.addRule("Priority_1", "priority = 1");
  await subscription2Client.addRule("Priority_2", "priority = 2");
  await subscription3Client.addRule("Priority_3", "priority >= 3");
}

// Sends 100 messages with a user property called "priority" whose value is between 1 and 4
async function sendMessages(ns: Namespace): Promise<void> {
  const topicClient = ns.createTopicClient(topicName);
  for (let index = 0; index < 100; index++) {
    const priority = Math.ceil(Math.random() * 4);
    const message: SendableMessageInfo = {
      body: `Message#${index} with priority ${priority}`,
      userProperties: { priority: priority }
    };

    console.log(` Sending message ${index} - ${message.body}`);
    await topicClient.send(message);
  }
}

// Prints messages from the 3 subscriptions
async function receiveMessages(ns: Namespace): Promise<void> {
  const subscription1Client = ns.createSubscriptionClient(topicName, subscriptionName1);
  const subscription2Client = ns.createSubscriptionClient(topicName, subscriptionName2);
  const subscription3Client = ns.createSubscriptionClient(topicName, subscriptionName3);

  const messagesFromFirstSubscription = await subscription1Client.receiveBatch(100);
  console.log("Messages from the first subscription:");
  for (let i = 0; i < messagesFromFirstSubscription.length; i++) {
    console.log(messagesFromFirstSubscription[i].body);
    messagesFromFirstSubscription[i].complete();
  }
  await subscription1Client.close();

  const messagesFromSecondSubscription = await subscription2Client.receiveBatch(100);
  console.log("Messages from the first subscription:");
  for (let i = 0; i < messagesFromSecondSubscription.length; i++) {
    console.log(messagesFromSecondSubscription[i].body);
    messagesFromSecondSubscription[i].complete();
  }
  await subscription2Client.close();

  const messagesFromThirdSubscription = await subscription3Client.receiveBatch(100);
  console.log("Messages from the first subscription:");
  for (let i = 0; i < messagesFromThirdSubscription.length; i++) {
    console.log(messagesFromThirdSubscription[i].body);
    messagesFromThirdSubscription[i].complete();
  }
  await subscription3Client.close();
}

async function removeAllRules(client: SubscriptionClient): Promise<void> {
  const rules = await client.getRules();
  for (let i = 0; i < rules.length; i++) {
    await client.removeRule(rules[i].name);
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
