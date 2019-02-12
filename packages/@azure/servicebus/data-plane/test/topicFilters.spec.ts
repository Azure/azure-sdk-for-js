// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

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
  TopicClient,
  SendableMessageInfo,
  CorrelationFilter,
  delay
} from "../lib";
import { getSenderReceiverClients, ClientType, purge } from "./testUtils";

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

let ns: Namespace;
let subscriptionClient: SubscriptionClient;
let topicClient: TopicClient;

async function beforeEachTest(receiverType: ClientType): Promise<void> {
  // The tests in this file expect the env variables to contain the connection string and
  // the names of empty queue/topic/subscription that are to be tested

  if (!process.env.SERVICEBUS_CONNECTION_STRING) {
    throw new Error(
      "Define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests."
    );
  }

  ns = Namespace.createFromConnectionString(process.env.SERVICEBUS_CONNECTION_STRING);

  const clients = await getSenderReceiverClients(ns, ClientType.TopicFilterTestTopic, receiverType);
  topicClient = clients.senderClient as TopicClient;
  subscriptionClient = clients.receiverClient as SubscriptionClient;

  await purge(subscriptionClient);
  const peekedSubscriptionMsg = await subscriptionClient.peek();
  if (peekedSubscriptionMsg.length) {
    chai.assert.fail("Please use an empty Subscription for integration testing");
  }
  if (receiverType === ClientType.TopicFilterTestSubscription) {
    await removeAllRules(subscriptionClient);
  }
}

async function afterEachTest(): Promise<void> {
  await removeAllRules(subscriptionClient);
  await subscriptionClient.addRule("DefaultFilter", true);

  const rules = await subscriptionClient.getRules();
  should.equal(rules.length, 1);
  should.equal(rules[0].name, "DefaultFilter");

  await ns.close();
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
  const sender = topicClient.getSender();
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const message: SendableMessageInfo = {
      body: "",
      messageId: Math.random(),
      correlationId: `${element.Priority}`,
      label: `${element.Color}`,
      userProperties: {
        color: `${element.Color}`,
        quantity: element.Quantity,
        priority: `${element.Priority}`
      }
    };
    await sender.send(message);
  }
}

async function receiveOrders(
  client: SubscriptionClient,
  expectedMessageCount: number
): Promise<ServiceBusMessage[]> {
  let errorFromErrorHandler: Error | undefined;
  const receivedMsgs: ServiceBusMessage[] = [];
  const receiver = client.getReceiver();
  receiver.receive(
    (msg: ServiceBusMessage) => {
      receivedMsgs.push(msg);
      return Promise.resolve();
    },
    (err: Error) => {
      if (err) {
        errorFromErrorHandler = err;
      }
    }
  );

  for (let i = 0; i < 10 && receivedMsgs.length < expectedMessageCount; i++) {
    await delay(1000);
  }

  await receiver.close();
  should.equal(
    errorFromErrorHandler,
    undefined,
    errorFromErrorHandler && errorFromErrorHandler.message
  );

  return receivedMsgs;
}

async function addRules(
  ruleName: string,
  filter: boolean | string | CorrelationFilter,
  sqlRuleActionExpression?: string
): Promise<void> {
  await subscriptionClient.addRule(ruleName, filter, sqlRuleActionExpression);

  const rules = await subscriptionClient.getRules();
  should.equal(rules.length, 1);
  should.equal(rules[0].name, ruleName, "Expected Rule not found");

  if (sqlRuleActionExpression) {
    should.equal(
      rules[0].action!.expression,
      sqlRuleActionExpression,
      "Action not set on the rule."
    );
  }
}

describe("Topic Filters -  Add Rule - Positive Test Cases", function(): void {
  beforeEach(async () => {
    await beforeEachTest(ClientType.TopicFilterTestSubscription);
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
      "SET sys.label = 'MessageX'"
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
    await beforeEachTest(ClientType.TopicFilterTestSubscription);
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
    should.equal(errorWasThrown, true, "Error thrown flag must be true");
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
    should.equal(errorWasThrown, true, "Error thrown flag must be true");
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
    should.equal(errorWasThrown, true, "Error thrown flag must be true");
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
    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });
});

describe("Topic Filters -  Remove Rule", function(): void {
  beforeEach(async () => {
    await beforeEachTest(ClientType.TopicFilterTestSubscription);
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
    should.equal(errorWasThrown, true, "Error thrown flag must be true");
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
    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });
});

describe("Topic Filters -  Get Rules", function(): void {
  beforeEach(async () => {
    await beforeEachTest(ClientType.TopicFilterTestSubscription);
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

  it("Rule with SQL filter and action returns expected filter and action expression", async function(): Promise<
    void
  > {
    await subscriptionClient.addRule(
      "Priority_1",
      "(priority = 1 OR priority = 3) AND (sys.label LIKE '%String1')",
      "SET sys.label = 'MessageX'"
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
    const expectedFilter = {
      correlationId: "high",
      label: "red",
      userProperties: []
    };
    should.equal(rules.length, 1);
    rules.forEach((rule) => {
      should.equal(
        (<CorrelationFilter>rule.filter).correlationId,
        expectedFilter.correlationId,
        "MessageId is different than expected"
      );
      should.equal((<CorrelationFilter>rule.filter).label, expectedFilter.label);
      const userProperties = (<CorrelationFilter>rule.filter).userProperties;
      should.equal(Array.isArray(userProperties), true);
      should.equal(userProperties.length, 0);
    });
  });
});

describe("Topic Filters -  Get Rules - Default Rule", function(): void {
  beforeEach(async () => {
    await beforeEachTest(ClientType.TopicFilterTestDefaultSubscription);
  });

  afterEach(async () => {
    await afterEachTest();
  });

  it("Default rule is returned for the subscription for which no rules were added", async function(): Promise<
    void
  > {
    const rules = await subscriptionClient.getRules();
    should.equal(rules.length, 1);
    should.equal(rules[0].name, "$Default");
  });
});

describe("Topic Filters -  Send/Receive messages using default filter of subscription", function(): void {
  beforeEach(async () => {
    await beforeEachTest(ClientType.TopicFilterTestDefaultSubscription);
  });

  afterEach(async () => {
    await afterEachTest();
  });

  it("Subscription with default filter receives all messages", async function(): Promise<void> {
    await sendOrders();
    const receivedMsgs = await receiveOrders(subscriptionClient, data.length);

    should.equal(Array.isArray(receivedMsgs), true);
    should.equal(receivedMsgs.length, data.length);

    await testPeekMsgsLength(subscriptionClient, 0);
  });
});

describe("Topic Filters -  Send/Receive messages using boolean filters of subscription", function(): void {
  beforeEach(async () => {
    await beforeEachTest(ClientType.TopicFilterTestSubscription);
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function addFilterAndReceiveOrders(
    bool: boolean,
    client: SubscriptionClient,
    expectedMessageCount: number
  ): Promise<ServiceBusMessage[]> {
    await subscriptionClient.addRule("BooleanFilter", bool);
    const rules = await subscriptionClient.getRules();
    should.equal(rules.length, 1);
    should.equal(rules[0].name, "BooleanFilter");

    await sendOrders();
    const receivedMsgs = await receiveOrders(client, expectedMessageCount);

    return receivedMsgs;
  }

  it("Subscription with true boolean filter receives all messages", async function(): Promise<
    void
  > {
    const receivedMsgs = await addFilterAndReceiveOrders(true, subscriptionClient, data.length);

    should.equal(Array.isArray(receivedMsgs), true);
    should.equal(receivedMsgs.length, data.length);

    await testPeekMsgsLength(subscriptionClient, 0);
  });

  it("Subscription with false boolean filter does not receive any messages", async function(): Promise<
    void
  > {
    const receivedMsgs = await addFilterAndReceiveOrders(false, subscriptionClient, 0);

    should.equal(Array.isArray(receivedMsgs), true);
    should.equal(receivedMsgs.length, 0);

    await testPeekMsgsLength(subscriptionClient, 0);
  });
});

describe("Topic Filters -  Send/Receive messages using sql filters of subscription", function(): void {
  beforeEach(async () => {
    await beforeEachTest(ClientType.TopicFilterTestSubscription);
  });

  afterEach(async () => {
    await afterEachTest();
  });

  it("SQL rule filter on the message properties", async function(): Promise<void> {
    await addRules("SQLMsgPropertyRule", "sys.label = 'red'");

    await sendOrders();
    const dataLength = data.filter((x) => x.Color === "red").length;
    const receivedMsgs = await receiveOrders(subscriptionClient, dataLength);

    should.equal(Array.isArray(receivedMsgs), true);
    should.equal(receivedMsgs.length, dataLength);

    await testPeekMsgsLength(subscriptionClient, 0);
  });

  it("SQL rule filter on the custom properties", async function(): Promise<void> {
    await addRules("SQLCustomRule", "color = 'red'");

    await sendOrders();
    const dataLength = data.filter((x) => x.Color === "red").length;
    const receivedMsgs = await receiveOrders(subscriptionClient, dataLength);

    should.equal(Array.isArray(receivedMsgs), true);
    should.equal(receivedMsgs.length, dataLength);

    await testPeekMsgsLength(subscriptionClient, 0);
  });

  it("SQL rule filter using AND operator ", async function(): Promise<void> {
    await addRules("SqlRuleWithAND", "color = 'blue' and quantity = 10");

    await sendOrders();
    const dataLength = data.filter((x) => x.Color === "blue" && x.Quantity === 10).length;
    const receivedMsgs = await receiveOrders(subscriptionClient, dataLength);

    should.equal(Array.isArray(receivedMsgs), true);
    should.equal(receivedMsgs.length, dataLength);

    await testPeekMsgsLength(subscriptionClient, 0);
  });

  it("SQL rule filter using OR operator ", async function(): Promise<void> {
    await addRules("SqlRuleWithOR", "color = 'blue' OR quantity = 10");

    await sendOrders();
    const dataLength = data.filter((x) => x.Color === "blue" || x.Quantity === 10).length;
    const receivedMsgs = await receiveOrders(subscriptionClient, dataLength);

    should.equal(Array.isArray(receivedMsgs), true);
    should.equal(receivedMsgs.length, dataLength);

    await testPeekMsgsLength(subscriptionClient, 0);
  });

  it("SQL rule filter with action with custom properties", async function(): Promise<void> {
    await addRules("SqlRuleWithAction", "color='blue'", "SET priority = 'High'");

    await sendOrders();
    const dataLength = data.filter((x) => x.Color === "blue").length;
    const receivedMsgs = await receiveOrders(subscriptionClient, dataLength);

    should.equal(Array.isArray(receivedMsgs), true);
    should.equal(receivedMsgs.length, dataLength);
    if (receivedMsgs[0].userProperties) {
      should.equal(receivedMsgs[0].userProperties.priority, "High");
    } else {
      chai.assert.fail("Received message doesnt have user properties");
    }
    await testPeekMsgsLength(subscriptionClient, 0);
  });

  // Standard subscription : Update message properties in random order.
  // Premium subscription : Update message properties only first time when you create new subscription.

  /* it("SQL rule filter with action with message properties", async function(): Promise<void> {
    await addRules("SqlRuleWithAction", "color='blue'", "SET sys.label = 'color blue'");

    await sendOrders();
    const dataLength = data.filter((x) => x.Color === "blue").length;
    const receivedMsgs = await receiveOrders(subscriptionClient, dataLength);

    should.equal(Array.isArray(receivedMsgs), true);
    should.equal(receivedMsgs.length, dataLength);
    if (receivedMsgs[0].userProperties) {
      should.equal(receivedMsgs[0].userProperties.priority, "High");
    } else {
      chai.assert.fail("Received message doesnt have user properties");
    }
    await testPeekMsgsLength(subscriptionClient, 0);
  });*/
});

describe("Topic Filters -  Send/Receive messages using correlation filters of subscription", function(): void {
  beforeEach(async () => {
    await beforeEachTest(ClientType.TopicFilterTestSubscription);
  });

  afterEach(async () => {
    await afterEachTest();
  });

  it("Correlation filter on the message properties", async function(): Promise<void> {
    await addRules("CorrelationMsgPropertyRule", {
      label: "red"
    });

    await sendOrders();
    const dataLength = data.filter((x) => x.Color === "red").length;
    const receivedMsgs = await receiveOrders(subscriptionClient, dataLength);

    should.equal(Array.isArray(receivedMsgs), true);
    should.equal(receivedMsgs.length, dataLength);

    await testPeekMsgsLength(subscriptionClient, 0);
  });

  it("Correlation filter on the custom properties", async function(): Promise<void> {
    await addRules("CorrelationCustomRule", {
      userProperties: {
        color: "red"
      }
    });

    await sendOrders();
    const dataLength = data.filter((x) => x.Color === "red").length;
    const receivedMsgs = await receiveOrders(subscriptionClient, dataLength);

    should.equal(Array.isArray(receivedMsgs), true);
    should.equal(receivedMsgs.length, dataLength);

    await testPeekMsgsLength(subscriptionClient, 0);
  });

  it("Correlation filter with SQL action", async function(): Promise<void> {
    await addRules(
      "CorrelationRuleWithAction",
      {
        userProperties: {
          color: "blue"
        }
      },
      "SET priority = 'High'"
    );

    await sendOrders();
    const dataLength = data.filter((x) => x.Color === "blue").length;
    const receivedMsgs = await receiveOrders(subscriptionClient, dataLength);

    should.equal(Array.isArray(receivedMsgs), true);
    should.equal(receivedMsgs.length, dataLength);

    if (receivedMsgs[0].userProperties) {
      should.equal(receivedMsgs[0].userProperties.priority, "High");
    } else {
      chai.assert.fail("Received message doesnt have user properties");
    }

    await testPeekMsgsLength(subscriptionClient, 0);
  });
});
