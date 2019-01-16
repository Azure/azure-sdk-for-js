// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
import dotenv from "dotenv";
dotenv.config();
chai.use(chaiAsPromised);
import {
  Namespace,
  SubscriptionClient,
  ServiceBusMessage,
  generateUuid,
  TopicClient,
  SendableMessageInfo,
  delay
} from "../lib";

// We need to remove rules before adding one because otherwise the existing default rule will let in all messages.
async function removeAllRules(client: SubscriptionClient): Promise<void> {
  const rules = await client.getRules();
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    await client.removeRule(rule.name);
  }
}

async function testPeekMsgsLength(
  client: SubscriptionClient,
  expectedPeekLength: number
): Promise<void> {
  const peekedMsgs = await client.peek(expectedPeekLength + 1);
  should.equal(
    peekedMsgs.length,
    expectedPeekLength,
    "Unexpected number of msgs found when peeking"
  );
}

let namespace: Namespace;
let subscriptionClient: SubscriptionClient;
let defaultSubscriptionClient: SubscriptionClient;
let topicClient: TopicClient;

async function beforeEachTest(): Promise<void> {
  // The tests in this file expect the env variables to contain the connection string and
  // the names of empty queue/topic/subscription that are to be tested

  if (!process.env.SERVICEBUS_CONNECTION_STRING) {
    throw new Error(
      "Define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests."
    );
  }
  if (!process.env.TOPIC_NAME) {
    throw new Error("Define TOPIC_NAME in your environment before running integration tests.");
  }
  if (!process.env.SUBSCRIPTION_NAME) {
    throw new Error(
      "Define SUBSCRIPTION_NAME in your environment before running integration tests."
    );
  }
  if (!process.env.DEFAULT_SUBSCRIPTION_NAME) {
    throw new Error(
      "Define DEFAULT_SUBSCRIPTION_NAME in your environment before running integration tests."
    );
  }

  namespace = Namespace.createFromConnectionString(process.env.SERVICEBUS_CONNECTION_STRING);
  topicClient = namespace.createTopicClient(process.env.TOPIC_NAME);
  subscriptionClient = namespace.createSubscriptionClient(
    process.env.TOPIC_NAME,
    process.env.SUBSCRIPTION_NAME
  );
  defaultSubscriptionClient = namespace.createSubscriptionClient(
    process.env.TOPIC_NAME,
    process.env.DEFAULT_SUBSCRIPTION_NAME
  );
  await removeAllRules(subscriptionClient);
}

async function afterEachTest(): Promise<void> {
  await namespace.close();
}

const data = [
  { Color: "blue", Quantity: 5, Priority: "low" },
  { Color: "red", Quantity: 10, Priority: "high" },
  { Color: "yellow", Quantity: 5, Priority: "low" },
  { Color: "blue", Quantity: 10, Priority: "low" },
  { Color: "blue", Quantity: 5, Priority: "high" },
  { Color: "blue", Quantity: 10, Priority: "low" },
  { Color: "red", Quantity: 5, Priority: "low" },
  { Color: "red", Quantity: 10, Priority: "low" },
  { Color: "red", Quantity: 5, Priority: "low" },
  { Color: "yellow", Quantity: 10, Priority: "high" },
  { Color: "yellow", Quantity: 5, Priority: "low" },
  { Color: "yellow", Quantity: 10, Priority: "low" }
];

async function sendOrders(): Promise<void> {
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const message: SendableMessageInfo = {
      body: "",
      messageId: generateUuid(),
      correlationId: `${element.Priority}`,
      label: `${element.Color}`,
      userProperties: {
        color: `${element.Color}`,
        quantity: `${element.Quantity}`,
        priority: `${element.Priority}`
      }
    };
    await topicClient.send(message);
  }
}

async function receiveOrders(client: SubscriptionClient): Promise<ServiceBusMessage[]> {
  const receivedMsgs: ServiceBusMessage[] = [];
  const receiveListener = client.receive(
    (msg: ServiceBusMessage) => {
      receivedMsgs.push(msg);
      return Promise.resolve();
    },
    (err: Error) => {
      should.not.exist(err);
    }
  );

  await delay(5000);
  await receiveListener.stop();

  return receivedMsgs;
}

describe("Topic Filters -  Add Rule - Positive Test Cases", function(): void {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function BooleanFilter(bool: boolean): Promise<void> {
    await subscriptionClient.addRule("BooleanFilter", bool);
    const rules = await subscriptionClient.getRules();
    should.equal(rules.length, 1);
    should.equal(rules[0].name, "BooleanFilter");
  }

  it("Add Rule with Boolean filter - True Filter", async function(): Promise<void> {
    await BooleanFilter(true);
  });

  it("Add Rule with Boolean filter - False Filter", async function(): Promise<void> {
    await BooleanFilter(false);
  });

  it("Add Rule with SQL filter", async function(): Promise<void> {
    await subscriptionClient.addRule(
      "Priority_1",
      "(priority = 1 OR priority = 2) AND (sys.label LIKE '%String2')"
    );
    const rules = await subscriptionClient.getRules();
    should.equal(rules.length, 1);
    should.equal(rules[0].name, "Priority_1");
  });

  it("Add Rule with SQL filter and action", async function(): Promise<void> {
    await subscriptionClient.addRule(
      "Priority_1",
      "(priority = 1 OR priority = 3) AND (sys.label LIKE '%String1')",
      "SET sys.body = 'MessageX'"
    );
    const rules = await subscriptionClient.getRules();
    should.equal(rules.length, 1);
    should.equal(rules[0].name, "Priority_1");
  });

  it("Add Rule with Correlation filter", async function(): Promise<void> {
    await subscriptionClient.addRule("Correlationfilter", {
      label: "red",
      correlationId: "high"
    });
    const rules = await subscriptionClient.getRules();
    should.equal(rules.length, 1);
    should.equal(rules[0].name, "Correlationfilter");
  });
});

describe("Topic Filters -  Add Rule - Negative Test Cases", function(): void {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  it("Adding a rule with a name which matches with existing rule", async function(): Promise<void> {
    await subscriptionClient.addRule("Priority_1", "priority = 1");
    let errorWasThrown = false;
    try {
      await subscriptionClient.addRule("Priority_1", "priority = 2");
    } catch (error) {
      errorWasThrown = true;
      should.equal(!error.message.search("Priority_1' already exists."), false);
      should.equal(error.name, "MessagingEntityAlreadyExistsError");
    }
    should.equal(errorWasThrown, true);
  });

  it("Adding a rule with no name", async function(): Promise<void> {
    let errorWasThrown = false;
    try {
      await subscriptionClient.addRule("", "priority = 2");
    } catch (error) {
      errorWasThrown = true;
      should.equal(!error.message.search("Rule name is missing"), false);
      should.equal(error.name, "Error");
    }
    should.equal(errorWasThrown, true);
  });

  it("Adding a rule with no filter", async function(): Promise<void> {
    let errorWasThrown = false;
    try {
      await subscriptionClient.addRule("Priority_1", "");
    } catch (error) {
      errorWasThrown = true;
      should.equal(!error.message.search("Filter is missing"), false);
      should.equal(error.name, "Error");
    }
    should.equal(errorWasThrown, true);
  });

  // TODO: Update error message after fixing https://github.com/Azure/azure-service-bus-node/issues/184
  it("Adding a rule with a Boolean filter whose input is not a Boolean, SQL expression or a Correlation filter", async function(): Promise<
    void
  > {
    let errorWasThrown = false;
    try {
      await subscriptionClient.addRule("Priority_2", "1");
    } catch (error) {
      errorWasThrown = true;
      should.equal(error.name, "InternalServerError");
    }
    should.equal(errorWasThrown, true);
  });
});

describe("Topic Filters -  Remove Rule", function(): void {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  it("Removing non existing rule on a subscription that doesnt have any rules should throw error", async function(): Promise<
    void
  > {
    let errorWasThrown = false;
    try {
      await subscriptionClient.removeRule("Priority_5");
    } catch (error) {
      should.equal(!error.message.search("Priority_5' could not be found"), false);
      should.equal(error.name, "MessagingEntityNotFoundError");
      errorWasThrown = true;
    }
    should.equal(errorWasThrown, true);
  });

  it("Removing non existing rule on a subscription that has other rules should throw error", async function(): Promise<
    void
  > {
    let errorWasThrown = false;
    try {
      await subscriptionClient.addRule("Priority_1", "priority = 1");
      await subscriptionClient.removeRule("Priority_5");
    } catch (error) {
      errorWasThrown = true;
    }
    should.equal(errorWasThrown, true);
  });
});

describe("Topic Filters: Get Rules", function(): void {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  it("Subscription with 0/1/multiple rules returns rules as expected", async function(): Promise<
    void
  > {
    let rules = await subscriptionClient.getRules();
    should.equal(rules.length, 0);

    const expr1 = "(priority = 1)";
    await subscriptionClient.addRule("Priority_1", expr1);
    rules = await subscriptionClient.getRules();
    should.equal(rules.length, 1);
    should.equal(rules[0].name, "Priority_1");
    should.equal(JSON.stringify(rules[0].filter), JSON.stringify({ expression: expr1 }));

    const expr2 = "(priority = 1 OR priority = 3) AND (sys.label LIKE '%String1')";
    await subscriptionClient.addRule("Priority_2", expr2);
    rules = await subscriptionClient.getRules();
    should.equal(rules.length, 2);
    should.equal(rules[0].name, "Priority_1");
    should.equal(JSON.stringify(rules[0].filter), JSON.stringify({ expression: expr1 }));
    should.equal(rules[1].name, "Priority_2");
    should.equal(JSON.stringify(rules[1].filter), JSON.stringify({ expression: expr2 }));
  });

  it("Default rule is returned for the subscription for which no rules were added", async function(): Promise<
    void
  > {
    const rules = await defaultSubscriptionClient.getRules();
    should.equal(rules.length, 1);
    should.equal(rules[0].name, "$Default");
  });

  it("Rule with SQL filter and action returns expected filter and action expression", async function(): Promise<
    void
  > {
    await subscriptionClient.addRule(
      "Priority_1",
      "(priority = 1 OR priority = 3) AND (sys.label LIKE '%String1')",
      "SET sys.body = 'MessageX'"
    );
    const rules = await subscriptionClient.getRules();
    should.equal(rules[0].name, "Priority_1");
  });

  it("Rule with Correlation filter returns expected filter", async function(): Promise<void> {
    await subscriptionClient.addRule("Correlationfilter", {
      label: "red",
      correlationId: "high"
    });
    const rules = await subscriptionClient.getRules();
    should.equal(rules[0].name, "Correlationfilter");
    const matchexpr = {
      correlationId: "high",
      messageId: undefined,
      to: undefined,
      replyTo: undefined,
      label: "red",
      sessionId: undefined,
      replyToSessionId: undefined,
      contentType: undefined,
      userProperties: []
    };
    should.equal(rules.length, 1);
    should.equal(JSON.stringify(rules[0].filter), JSON.stringify(matchexpr));
  });
});

describe("Send/Receive messages using default filter of subscription", function(): void {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  it("Subscription with default filter receives all messages", async function(): Promise<void> {
    await sendOrders();
    const receivedMsgs = await receiveOrders(defaultSubscriptionClient);

    should.equal(Array.isArray(receivedMsgs), true);
    should.equal(receivedMsgs.length, data.length);

    await testPeekMsgsLength(defaultSubscriptionClient, 0);
  });
});

describe("Send/Receive messages using boolean filters of subscription", function(): void {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await receiveOrders(defaultSubscriptionClient);
    await testPeekMsgsLength(defaultSubscriptionClient, 0);
    await afterEachTest();
  });

  async function addFilterAndReceiveOrders(
    bool: boolean,
    client: SubscriptionClient
  ): Promise<ServiceBusMessage[]> {
    await subscriptionClient.addRule("BooleanFilter", bool);
    const rules = await subscriptionClient.getRules();
    should.equal(rules.length, 1);
    should.equal(rules[0].name, "BooleanFilter");

    await sendOrders();
    const receivedMsgs = await receiveOrders(client);

    return receivedMsgs;
  }

  it("Subscription with true boolean filter receives all messages", async function(): Promise<
    void
  > {
    const receivedMsgs = await addFilterAndReceiveOrders(true, subscriptionClient);

    should.equal(Array.isArray(receivedMsgs), true);
    should.equal(receivedMsgs.length, data.length);

    await testPeekMsgsLength(subscriptionClient, 0);
  });

  it("Subscription with false boolean filter does not receive any messages", async function(): Promise<
    void
  > {
    const receivedMsgs = await addFilterAndReceiveOrders(false, subscriptionClient);

    should.equal(Array.isArray(receivedMsgs), true);
    should.equal(receivedMsgs.length, 0);

    await testPeekMsgsLength(subscriptionClient, 0);
  });
});
