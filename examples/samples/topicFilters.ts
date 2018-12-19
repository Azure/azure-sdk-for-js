import {
  Namespace,
  SubscriptionClient,
  TopicClient,
  SendableMessageInfo,
  OnMessage,
  OnError,
  MessagingError,
  delay,
  ServiceBusMessage
} from "../../lib";
import * as dotenv from "dotenv";
import { CorrelationFilter } from "../../lib/core/managementClient";
dotenv.config();

const str = process.env.SERVICEBUS_CONNECTION_STRING || "";
const topic = process.env.TOPIC_NAME || "";
const subscriptionAllMessages = process.env.SUBSCRIPTION_ALL_MESSAGES || "";
const subscriptionColorBlueSize10Orders = process.env.SUBSCRIPTION_COLOR_BLUE_ORDER_10 || "";
const subscriptionColorRed = process.env.SUBSCRIPTION_CORRELATION_COLOR_RED || "";
const subscriptionHighPriorityOrders = process.env.SUBSCRIPTION_HIGH_PRIORITY || "";

console.log("str: ", str);
console.log("path: ", topic);
console.log("subscription all messages: ", subscriptionAllMessages);
console.log("subscription color blue size 10 orders: ", subscriptionColorBlueSize10Orders);
console.log("subscription color red: ", subscriptionColorRed);
console.log("subscription high priority orders: ", subscriptionHighPriorityOrders);

let ns: Namespace;

// This sample demonstrates how to use advanced filters with ServiceBus topics and subscriptions.
// The sample creates a topic and 4 subscriptions with different filter definitions.
// Each receiver will receive matching messages depending on the filter associated with a subscription.

async function main(): Promise<void> {
  ns = Namespace.createFromConnectionString(str);

  // Add different filter definitions in all the subscriptions.

  // The first subscription selects all messages with a "true" filter, which is a SQL filter with an expression that is trivially true.
  const subscriptionClientAllOrders = ns.createSubscriptionClient(topic, subscriptionAllMessages);
  await removeAllRules(subscriptionClientAllOrders);
  await addRules(subscriptionClientAllOrders, "AllOrders", "1=1");

  // The second subscription selects all messages with a SQL filter with the user property 'color' having the value 'blue' and the 'quantity' user property having the value 10.
  const subscriptionClientColorBlueSize10Orders = ns.createSubscriptionClient(
    topic,
    subscriptionColorBlueSize10Orders
  );
  await removeAllRules(subscriptionClientColorBlueSize10Orders);
  await addRules(
    subscriptionClientColorBlueSize10Orders,
    "ColorBlueSize10Orders",
    "color = 'blue' AND quantity = 10"
  );

  // The third subscription selects all messages with a SQL filter with the user property 'color' having the value 'red'.
  const subscriptionClientColorRed = ns.createSubscriptionClient(topic, subscriptionColorRed);
  await removeAllRules(subscriptionClientColorRed);
  await addRules(subscriptionClientColorRed, "ColorRed", "color = 'red'");

  // The forth subscription selects all messages using a correlation filter with the Label property having the value 'red' and the CorrelationId property having the value 'high'
  const subscriptionClientHighPriorityOrders = ns.createSubscriptionClient(
    topic,
    subscriptionHighPriorityOrders
  );
  await removeAllRules(subscriptionClientHighPriorityOrders);
  await addRules(subscriptionClientHighPriorityOrders, "CorrelationRule", {
    label: "red",
    correlationId: "high"
  });

  await subscriptionClientAllOrders.close();
  await subscriptionClientColorBlueSize10Orders.close();
  await subscriptionClientColorRed.close();
  await subscriptionClientHighPriorityOrders.close();

  // Create client for the topic.
  const topicClient = ns.createTopicClient(topic);

  // Create a message sender from the topic client.
  console.log("\nSending orders to topic.");
  const promises = new Array();

  // Now we can start sending orders.
  promises.push(SendOrder(topicClient, { Color: "blue", Quantity: 5, Priority: "low" }));
  promises.push(SendOrder(topicClient, { Color: "red", Quantity: 10, Priority: "high" }));
  promises.push(SendOrder(topicClient, { Color: "yellow", Quantity: 5, Priority: "low" }));
  promises.push(SendOrder(topicClient, { Color: "blue", Quantity: 10, Priority: "low" }));
  promises.push(SendOrder(topicClient, { Color: "blue", Quantity: 5, Priority: "high" }));
  promises.push(SendOrder(topicClient, { Color: "blue", Quantity: 10, Priority: "low" }));
  promises.push(SendOrder(topicClient, { Color: "red", Quantity: 5, Priority: "low" }));
  promises.push(SendOrder(topicClient, { Color: "red", Quantity: 10, Priority: "low" }));
  promises.push(SendOrder(topicClient, { Color: "red", Quantity: 5, Priority: "low" }));
  promises.push(SendOrder(topicClient, { Color: "yellow", Quantity: 10, Priority: "high" }));
  promises.push(SendOrder(topicClient, { Color: "yellow", Quantity: 5, Priority: "low" }));
  promises.push(SendOrder(topicClient, { Color: "yellow", Quantity: 10, Priority: "low" }));

  // wait until all the send tasks are complete
  await Promise.all(promises);

  // Receive messages from subscriptions.
  await receiveAllMessagesFromSubscription(subscriptionClientAllOrders);
  await receiveAllMessagesFromSubscription(subscriptionClientColorBlueSize10Orders);
  await receiveAllMessagesFromSubscription(subscriptionClientColorRed);
  await receiveAllMessagesFromSubscription(subscriptionClientHighPriorityOrders);

  await topicClient.close();
}

async function SendOrder(topicClient: TopicClient, order: any): Promise<void> {
  const message: SendableMessageInfo = {
    body: "",
    correlationId: order.Priority,
    label: order.Color,
    userProperties: {
      color: order.Color,
      quantity: order.Quantity,
      priority: order.Priority
    }
  };

  await topicClient.send(message);
  console.log(
    `Sent order with Color: ${order.Color}, Quantity: ${order.Quantity}, Priority:${order.Priority}`
  );
}

async function receiveAllMessagesFromSubscription(client: SubscriptionClient): Promise<void> {
  console.log(`\nReceiving messages from subscription  ${client.name}.\n`);

  const onMessage: OnMessage = async (brokeredMessage: ServiceBusMessage) => {
    const color = brokeredMessage.userProperties ? brokeredMessage.userProperties.color : undefined;
    const quantity = brokeredMessage.userProperties
      ? brokeredMessage.userProperties.quantity
      : undefined;
    const priority = brokeredMessage.userProperties
      ? brokeredMessage.userProperties.priority
      : undefined;
    console.log(
      `Received order with Color: ${color} , Quantity: ${quantity}, Priority:${priority}`
    );
    await brokeredMessage.complete();
  };
  const onError: OnError = (err: MessagingError | Error) => {
    console.log(">>>>> Error occurred: ", err);
  };
  const rcvHandler = client.receive(onMessage, onError);
  await delay(2000);
  await rcvHandler.stop();
}

async function removeAllRules(client: SubscriptionClient): Promise<boolean> {
  let rules = await client.getRules();
  console.log(`${rules.length} rules found for ${client.name}`);

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    console.log(`Rule Name: ${rule.name}`);
    console.log(`Filter: ${JSON.stringify(rule.filter)}`);
    if (rule.action) {
      console.log(`Action: ${JSON.stringify(rule.action)}`);
    }
    await client.removeRule(rule.name);
  }

  rules = await client.getRules();
  if (rules.length) {
    console.log(`Failed to remove all rules from ${client.name}`);
    return false;
  } else {
    console.log(`All rules removed from ${client.name}`);
  }

  return true;
}

async function addRules(
  client: SubscriptionClient,
  ruleName: string,
  filter: boolean | string | CorrelationFilter,
  sqlRuleActionExpression?: string
): Promise<void> {
  await client.addRule(ruleName, filter, sqlRuleActionExpression);
  const rules = await client.getRules();
  if (rules.find((rule) => rule.name === ruleName)) {
    console.log(`Rule ${ruleName} has been added \n`);
  } else {
    console.log(`Nooooo.... Where is the ${ruleName} rule??`);
    return;
  }
}

main()
  .then(() => {
    console.log(">>>> Calling close....");
    return ns.close();
  })
  .catch((err) => {
    console.log("error: ", err);
    return ns.close();
  });
