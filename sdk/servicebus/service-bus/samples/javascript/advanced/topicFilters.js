/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  **NOTE**: If you are using version 1.1.x or lower, then please use the link below:
  https://github.com/Azure/azure-sdk-for-js/tree/%40azure/service-bus_1.1.5/sdk/servicebus/service-bus/samples

  This sample illustrates how to use topic subscriptions and filters for splitting
  up a message stream into multiple streams based on message properties.

  In this sample, we will send messages with property "priority" of 1 and 2 to two separate subscriptions,
  and the rest of the messages to the third subscription.

  Setup: To run this sample, you would need a Topic with 3 subscriptions.

  See https://docs.microsoft.com/en-us/azure/service-bus-messaging/topic-filters to learn aboout
  Topic filters and actions.
*/
const { ServiceBusClient } = require("@azure/service-bus");
// Load the .env file if it exists
require("dotenv").config();
// Define connection string and related Service Bus entity names here
const connectionString =
  process.env.SERVICE_BUS_CONNECTION_STRING || "<connection string>";
const topicName = process.env.TOPIC_NAME || "<topic name>";
const subscriptionName1 =
  process.env.TOPIC_FILTER_SUBSCRIPTION_1 || "<subscription name>";
const subscriptionName2 =
  process.env.TOPIC_FILTER_SUBSCRIPTION_2 || "<subscription name>";
const subscriptionName3 =
  process.env.TOPIC_FILTER_SUBSCRIPTION_3 || "<subscription name>";
async function main() {
  const sbClient = new ServiceBusClient(connectionString);
  try {
    await addRules(sbClient);

    await sendMessages(sbClient);

    await receiveMessages(sbClient);
  } finally {
    await sbClient.close();
  }
}

// Adds Rules on subscriptions to route messages from a topic to different subscriptions
async function addRules(sbClient) {
  const subscription1Client = sbClient.getSubscriptionRuleManager(
    topicName,
    subscriptionName1
  );
  const subscription2Client = sbClient.getSubscriptionRuleManager(
    topicName,
    subscriptionName2
  );
  const subscription3Client = sbClient.getSubscriptionRuleManager(
    topicName,
    subscriptionName3
  );
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
async function sendMessages(sbClient) {
  const sender = sbClient.getSender(topicName);
  for (let index = 0; index < 10; index++) {
    const priority = Math.ceil(Math.random() * 4);
    const message = {
      body: `Message#${index} with priority ${priority}`,
      userProperties: { priority: priority }
    };
    console.log(` Sending message ${index} - ${message.body}`);
    await sender.send(message);
  }
}
// Prints messages from the 3 subscriptions
async function receiveMessages(sbClient) {
  const subscription1 = sbClient.getReceiver(
    topicName,
    subscriptionName1,
    "peekLock"
  );
  const subscription2 = sbClient.getReceiver(
    topicName,
    subscriptionName2,
    "peekLock"
  );
  const subscription3 = sbClient.getReceiver(
    topicName,
    subscriptionName3,
    "peekLock"
  );

  const messagesFromSubscription1 = await subscription1.receiveBatch(10, {
    maxWaitTimeSeconds: 5
  });
  console.log(">>>>> Messages from the first subscription:");
  for (let i = 0; i < messagesFromSubscription1.length; i++) {
    console.log(messagesFromSubscription1[i].body);
    await messagesFromSubscription1[i].complete();
  }
  await subscription1.close();

  const messagesFromSubscription2 = await subscription2.receiveBatch(10, {
    maxWaitTimeSeconds: 5
  });
  console.log(">>>>> Messages from the second subscription:");
  for (let i = 0; i < messagesFromSubscription2.length; i++) {
    console.log(messagesFromSubscription2[i].body);
    await messagesFromSubscription2[i].complete();
  }
  await subscription2.close();

  const messagesFromSubscription3 = await subscription3.receiveBatch(10, {
    maxWaitTimeSeconds: 5
  });
  console.log(">>>>> Messages from the third subscription:");
  for (let i = 0; i < messagesFromSubscription3.length; i++) {
    console.log(messagesFromSubscription3[i].body);
    await messagesFromSubscription3[i].complete();
  }
  await subscription3.close();
}

async function removeAllRules(client) {
  const rules = await client.getRules();
  for (let i = 0; i < rules.length; i++) {
    await client.removeRule(rules[i].name);
  }
}

main().catch(err => {
  console.log("Error occurred: ", err);
});
