// This sample manages rules for the subscriptions using {addRules, removeAllRules} functions in the code.
// Follow the link to do the same in other ways. Link - https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-resource-manager-namespace-topic-with-rule
import {
  OnMessage,
  OnError,
  MessagingError,
  delay,
  ServiceBusMessage,
  generateUuid,
  Namespace,
  SendableMessageInfo,
  SubscriptionClient,
  TopicClient
} from "../../lib";
import * as dotenv from "dotenv";
dotenv.config();

const str = process.env.SERVICEBUS_CONNECTION_STRING || "";
const topic = process.env.TOPIC_NAME || "";
const subscription1 = process.env.SUBSCRIPTION_NAME1 || "";
const subscription2 = process.env.SUBSCRIPTION_NAME2 || "";
const subscription3 = process.env.SUBSCRIPTION_NAME3 || "";

console.log(`str: ${str}`);
console.log(`path: ${topic}`);
console.log(`Subscription 1: ${subscription1}`);
console.log(`Subscription 2: ${subscription2}`);
console.log(`Subscription 3: ${subscription3}\n`);

let ns: Namespace;

async function sendMessages(topicClient: TopicClient): Promise<void> {
  for (let index = 0; index < 100; index++) {
    const element = `Message#${index}`;
    const message: SendableMessageInfo = {
      body: element,
      userProperties: { priority: Math.ceil(Math.random() * 3) },
      label: "Random String",
      timeToLive: 2 * 60 * 1000, // 2 minutes
      messageId: generateUuid()
    };

    console.log(` Sending message ${index} - ${message.body}`);
    await topicClient.send(message);
  }
}

async function main(): Promise<void> {
  ns = Namespace.createFromConnectionString(str);
  const client = ns.createTopicClient(topic);

  const subscription1Client = ns.createSubscriptionClient(topic, subscription1);
  await removeAllRules(subscription1Client);
  await subscription1Client.addRule("Priority_1", "priority = 1");

  const subscription2Client = ns.createSubscriptionClient(topic, subscription2);
  await removeAllRules(subscription2Client);
  await subscription2Client.addRule("Priority_2", "priority = 2");

  const subscription3Client = ns.createSubscriptionClient(topic, subscription3);
  await removeAllRules(subscription3Client);
  await subscription3Client.addRule("Priority_3", "priority = 3");

  await sendMessages(client);
  // Setting up receive handlers

  await receiveMessages(subscription1Client);
  await receiveMessages(subscription2Client);
  await receiveMessages(subscription3Client);

  await subscription1Client.close();
  await subscription2Client.close();
  await subscription3Client.close();

  await client.close();
  return ns.close();
}

async function receiveMessages(client: SubscriptionClient): Promise<void> {
  // retrieve messages from the queue
  const onMessage: OnMessage = async (brokeredMessage: ServiceBusMessage) => {
    console.log(
      `### Received message- Subscription: ${client.name}, Priority: ${
        brokeredMessage.userProperties ? brokeredMessage.userProperties["priority"] : undefined
      }`
    );
  };

  const onError: OnError = (err: MessagingError | Error) => {
    console.log("\n>>>>> Error occurred: ", err);
  };

  const rcvHandler = client.receive(onMessage, onError);
  await delay(10000);
  await rcvHandler.stop();
}

// We need to remove rules before adding one because otherwise the existing default rule will let in all messages.
async function removeAllRules(client: SubscriptionClient): Promise<void> {
  try {
    const rules = await client.getRules();
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      await client.removeRule(rule.name);
    }
  } catch (err) {
    console.log("Error while removing the rule", err);
  }
}

main()
  .then(() => {
    console.log("\n>>>> Sample Done!");
  })
  .catch((err) => {
    console.log("error: ", err);
    return ns.close();
  });
