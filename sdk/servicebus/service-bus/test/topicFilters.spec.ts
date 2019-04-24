// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
import dotenv from "dotenv";
dotenv.config();
chai.use(chaiAsPromised);
import {
  ServiceBusClient,
  SubscriptionClient,
  ServiceBusMessage,
  TopicClient,
  SendableMessageInfo,
  CorrelationFilter,
  ReceiveMode
} from "../src";
import { getSenderReceiverClients, TestClientType, purge, checkWithTimeout } from "./testUtils";

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

let ns: ServiceBusClient;
let subscriptionClient: SubscriptionClient;
let topicClient: TopicClient;

async function beforeEachTest(receiverType: TestClientType): Promise<void> {
  // The tests in this file expect the env variables to contain the connection string and
  // the names of empty queue/topic/subscription that are to be tested

  if (!process.env.SERVICEBUS_CONNECTION_STRING) {
    throw new Error(
      "Define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests."
    );
  }

  ns = ServiceBusClient.createFromConnectionString(process.env.SERVICEBUS_CONNECTION_STRING);

  const clients = await getSenderReceiverClients(
    ns,
    TestClientType.TopicFilterTestTopic,
    receiverType
  );
  topicClient = clients.senderClient as TopicClient;
  subscriptionClient = clients.receiverClient as SubscriptionClient;

  await purge(subscriptionClient);
  const peekedSubscriptionMsg = await subscriptionClient.peek();
  if (peekedSubscriptionMsg.length) {
    chai.assert.fail("Please use an empty Subscription for integration testing");
  }
  if (receiverType === TestClientType.TopicFilterTestSubscription) {
    await removeAllRules(subscriptionClient);
  }
}

async function afterEachTest(clearRules: boolean = true): Promise<void> {
  if (clearRules) {
    await removeAllRules(subscriptionClient);
    await subscriptionClient.addRule("DefaultFilter", true);

    const rules = await subscriptionClient.getRules();
    should.equal(rules.length, 1, "Unexpected number of rules");
    should.equal(rules[0].name, "DefaultFilter", "RuleName is different than expected");
  }
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
  const sender = topicClient.createSender();
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const message: SendableMessageInfo = {
      body: "",
      messageId: `messageId: ${Math.random()}`,
      correlationId: `${element.Priority}`,
      label: `${element.Color}`,
      userProperties: {
        color: `${element.Color}`,
        quantity: element.Quantity,
        priority: `${element.Priority}`
      },
      partitionKey: "dummy" // Ensures all messages go to same parition to make peek work reliably
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
  const receiver = await client.createReceiver(ReceiveMode.peekLock);
  receiver.registerMessageHandler(
    (msg: ServiceBusMessage) => {
      return msg.complete().then(() => {
        receivedMsgs.push(msg);
      });
    },
    (err: Error) => {
      if (err) {
        errorFromErrorHandler = err;
      }
    }
  );

  const msgsCheck = await checkWithTimeout(() => receivedMsgs.length === expectedMessageCount);
  should.equal(
    msgsCheck,
    true,
    `Expected ${expectedMessageCount}, but received ${receivedMsgs.length} messages`
  );

  await receiver.close();
  should.equal(
    errorFromErrorHandler,
    undefined,
    errorFromErrorHandler && errorFromErrorHandler.message
  );
  should.equal(receivedMsgs.length, expectedMessageCount, "Unexpected number of messages");

  return receivedMsgs;
}

async function addRules(
  ruleName: string,
  filter: boolean | string | CorrelationFilter,
  sqlRuleActionExpression?: string
): Promise<void> {
  await subscriptionClient.addRule(ruleName, filter, sqlRuleActionExpression);

  const rules = await subscriptionClient.getRules();
  should.equal(rules.length, 1, "Unexpected number of rules");
  should.equal(rules[0].name, ruleName, "Expected Rule not found");

  if (sqlRuleActionExpression) {
    should.equal(rules[0].action!, sqlRuleActionExpression, "Action not set on the rule.");
  }
}

describe("addRule()", function(): void {
  beforeEach(async () => {
    await beforeEachTest(TestClientType.TopicFilterTestSubscription);
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function BooleanFilter(bool: boolean): Promise<void> {
    await subscriptionClient.addRule("BooleanFilter", bool);
    const rules = await subscriptionClient.getRules();
    should.equal(rules.length, 1, "Unexpected number of rules");
    should.equal(rules[0].name, "BooleanFilter", "RuleName is different than expected");
  }

  it("Add True Filter", async function(): Promise<void> {
    await BooleanFilter(true);
  });

  it("Add False Filter", async function(): Promise<void> {
    await BooleanFilter(false);
  });

  it("Add SQL filter", async function(): Promise<void> {
    await subscriptionClient.addRule(
      "Priority_1",
      "(priority = 1 OR priority = 2) AND (sys.label LIKE '%String2')"
    );
    const rules = await subscriptionClient.getRules();
    should.equal(rules.length, 1, "Unexpected number of rules");
    should.equal(rules[0].name, "Priority_1", "RuleName is different than expected");
  });

  it("Add SQL filter and action", async function(): Promise<void> {
    await subscriptionClient.addRule(
      "Priority_1",
      "(priority = 1 OR priority = 3) AND (sys.label LIKE '%String1')",
      "SET sys.label = 'MessageX'"
    );
    const rules = await subscriptionClient.getRules();
    should.equal(rules.length, 1, "Unexpected number of rules");
    should.equal(rules[0].name, "Priority_1", "RuleName is different than expected");
  });

  it("Add Correlation filter", async function(): Promise<void> {
    await subscriptionClient.addRule("Correlationfilter", {
      label: "red",
      correlationId: "high"
    });
    const rules = await subscriptionClient.getRules();
    should.equal(rules.length, 1, "Unexpected number of rules");
    should.equal(rules[0].name, "Correlationfilter", "RuleName is different than expected");
  });

  it("Add rule with a name which matches with existing rule", async function(): Promise<void> {
    await subscriptionClient.addRule("Priority_1", "priority = 1");
    let errorWasThrown = false;
    try {
      await subscriptionClient.addRule("Priority_1", "priority = 2");
    } catch (error) {
      errorWasThrown = true;
      should.equal(
        !error.message.search("Priority_1' already exists."),
        false,
        "ErrorMessage is different than expected"
      );
      should.equal(
        error.name,
        "MessagingEntityAlreadyExistsError",
        "ErrorName is different than expected"
      );
    }
    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });
});

describe("removeRule()", function(): void {
  beforeEach(async () => {
    await beforeEachTest(TestClientType.TopicFilterTestSubscription);
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
      should.equal(
        !error.message.search("Priority_5' could not be found"),
        false,
        "ErrorMessage is different than expected"
      );
      should.equal(
        error.name,
        "MessagingEntityNotFoundError",
        "ErrorName is different than expected"
      );
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

describe("getRules()", function(): void {
  beforeEach(async () => {
    await beforeEachTest(TestClientType.TopicFilterTestSubscription);
  });

  afterEach(async () => {
    await afterEachTest();
  });

  it("Subscription with 0/1/multiple rules returns rules as expected", async function(): Promise<
    void
  > {
    let rules = await subscriptionClient.getRules();
    should.equal(rules.length, 0, "Unexpected number of rules");

    const expr1 = "(priority = 1)";
    await subscriptionClient.addRule("Priority_1", expr1);
    rules = await subscriptionClient.getRules();
    should.equal(rules.length, 1, "Unexpected number of rules");
    should.equal(rules[0].name, "Priority_1", "RuleName is different than expected");
    should.equal(rules[0].filter, expr1, "Filter-expression is different than expected");

    const expr2 = "(priority = 1 OR priority = 3) AND (sys.label LIKE '%String1')";
    await subscriptionClient.addRule("Priority_2", expr2);
    rules = await subscriptionClient.getRules();
    should.equal(rules.length, 2, "Unexpected number of rules");
    should.equal(rules[0].name, "Priority_1", "RuleName is different than expected");
    should.equal(rules[0].filter, expr1, "Filter-expression is different than expected");
    should.equal(rules[1].name, "Priority_2", "RuleName is different than expected");
    should.equal(rules[1].filter, expr2, "Filter-expression is different than expected");
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
    should.equal(rules[0].name, "Priority_1", "RuleName is different than expected");
  });

  it("Rule with Correlation filter returns expected filter", async function(): Promise<void> {
    await subscriptionClient.addRule("Correlationfilter", {
      label: "red",
      correlationId: "high"
    });
    const rules = await subscriptionClient.getRules();
    should.equal(rules[0].name, "Correlationfilter", "RuleName is different than expected");
    const expectedFilter = {
      correlationId: "high",
      label: "red",
      userProperties: []
    };
    should.equal(rules.length, 1, "Unexpected number of rules");
    rules.forEach((rule) => {
      should.equal(
        (<CorrelationFilter>rule.filter).correlationId,
        expectedFilter.correlationId,
        "MessageId is different than expected"
      );
      should.equal(
        (<CorrelationFilter>rule.filter).label,
        expectedFilter.label,
        "Filter-label is different than expected"
      );
      const userProperties = (<CorrelationFilter>rule.filter).userProperties;
      should.equal(Array.isArray(userProperties), true, "`ReceivedMessages` is not an array");
      should.equal(userProperties.length, 0, "Unexpected number of messages");
    });
  });
});

describe("Default Rule - Send/Receive", function(): void {
  beforeEach(async () => {
    await beforeEachTest(TestClientType.TopicFilterTestDefaultSubscription);
  });

  afterEach(async () => {
    await afterEachTest(false);
  });

  it("Default rule is returned for the subscription for which no rules were added", async function(): Promise<
    void
  > {
    const rules = await subscriptionClient.getRules();
    should.equal(rules.length, 1, "Unexpected number of rules");
    should.equal(rules[0].name, "$Default", "RuleName is different than expected");
  });

  it("Subscription with default filter receives all messages", async function(): Promise<void> {
    await sendOrders();
    await receiveOrders(subscriptionClient, data.length);

    await testPeekMsgsLength(subscriptionClient, 0);
  });
});

describe("Boolean Filter - Send/Receive", function(): void {
  beforeEach(async () => {
    await beforeEachTest(TestClientType.TopicFilterTestSubscription);
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function addFilterAndReceiveOrders(
    bool: boolean,
    client: SubscriptionClient,
    expectedMessageCount: number
  ): Promise<void> {
    await subscriptionClient.addRule("BooleanFilter", bool);
    const rules = await subscriptionClient.getRules();
    should.equal(rules.length, 1, "Unexpected number of rules");
    should.equal(rules[0].name, "BooleanFilter", "RuleName is different than expected");

    await sendOrders();
    await receiveOrders(client, expectedMessageCount);
    await testPeekMsgsLength(client, 0);
  }

  it("True boolean filter receives all messages", async function(): Promise<void> {
    await addFilterAndReceiveOrders(true, subscriptionClient, data.length);
  });

  it("False boolean filter does not receive any messages", async function(): Promise<void> {
    await addFilterAndReceiveOrders(false, subscriptionClient, 0);
  });
});

describe("Sql Filter - Send/Receive", function(): void {
  beforeEach(async () => {
    await beforeEachTest(TestClientType.TopicFilterTestSubscription);
  });

  afterEach(async () => {
    await afterEachTest();
  });

  it("SQL rule filter on the message properties", async function(): Promise<void> {
    await addRules("SQLMsgPropertyRule", "sys.label = 'red'");

    await sendOrders();
    const dataLength = data.filter((x) => x.Color === "red").length;
    await receiveOrders(subscriptionClient, dataLength);

    await testPeekMsgsLength(subscriptionClient, 0);
  });

  it("SQL rule filter on the custom properties", async function(): Promise<void> {
    await addRules("SQLCustomRule", "color = 'red'");

    await sendOrders();
    const dataLength = data.filter((x) => x.Color === "red").length;
    await receiveOrders(subscriptionClient, dataLength);

    await testPeekMsgsLength(subscriptionClient, 0);
  });

  it("SQL rule filter using AND operator ", async function(): Promise<void> {
    await addRules("SqlRuleWithAND", "color = 'blue' and quantity = 10");

    await sendOrders();
    const dataLength = data.filter((x) => x.Color === "blue" && x.Quantity === 10).length;
    await receiveOrders(subscriptionClient, dataLength);

    await testPeekMsgsLength(subscriptionClient, 0);
  });

  it("SQL rule filter using OR operator ", async function(): Promise<void> {
    await addRules("SqlRuleWithOR", "color = 'blue' OR quantity = 10");

    await sendOrders();
    const dataLength = data.filter((x) => x.Color === "blue" || x.Quantity === 10).length;
    await receiveOrders(subscriptionClient, dataLength);

    await testPeekMsgsLength(subscriptionClient, 0);
  });

  it("SQL rule filter with action with custom properties", async function(): Promise<void> {
    await addRules("SqlRuleWithAction", "color='blue'", "SET priority = 'High'");

    await sendOrders();
    const dataLength = data.filter((x) => x.Color === "blue").length;
    const receivedMsgs = await receiveOrders(subscriptionClient, dataLength);

    if (receivedMsgs[0].userProperties) {
      should.equal(
        receivedMsgs[0].userProperties.priority,
        "High",
        "Priority of the receivedMessage is different than expected"
      );
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

    if (receivedMsgs[0].userProperties) {
      should.equal(receivedMsgs[0].userProperties.priority, "High",
        "Priority of the receivedMessage is different than expected");
    } else {
      chai.assert.fail("Received message doesnt have user properties");
    }
    await testPeekMsgsLength(subscriptionClient, 0);
  });*/
});

describe("Correlation Filter - Send/Receive", function(): void {
  beforeEach(async () => {
    await beforeEachTest(TestClientType.TopicFilterTestSubscription);
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
    await receiveOrders(subscriptionClient, dataLength);

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
    await receiveOrders(subscriptionClient, dataLength);

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

    if (receivedMsgs[0].userProperties) {
      should.equal(
        receivedMsgs[0].userProperties.priority,
        "High",
        "Priority of the receivedMessage is different than expected"
      );
    } else {
      chai.assert.fail("Received message doesnt have user properties");
    }

    await testPeekMsgsLength(subscriptionClient, 0);
  });
});
