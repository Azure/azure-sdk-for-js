// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
import * as dotenv from "dotenv";
dotenv.config();
chai.use(chaiAsPromised);
import { ServiceBusClient, SubscriptionClient, CorrelationFilter } from "../../src";
import { getSenderReceiverClients, TestClientType, purge } from "./testUtils";

// We need to remove rules before adding one because otherwise the existing default rule will let in all messages.
async function removeAllRules(client: SubscriptionClient): Promise<void> {
  const rules = await client.getRules();
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    await client.removeRule(rule.name);
  }
}

let ns: ServiceBusClient;
let subscriptionClient: SubscriptionClient;

async function beforeEachTest(receiverType: TestClientType): Promise<void> {
  // The tests in this file expect the env variables to contain the connection string and
  // the names of empty queue/topic/subscription that are to be tested

  // @ts-ignore
  if (!window.__env__["SERVICEBUS_CONNECTION_STRING"]) {
    throw new Error(
      "Define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests."
    );
  }

  // @ts-ignore
  ns = ServiceBusClient.createFromConnectionString(window.__env__["SERVICEBUS_CONNECTION_STRING"]);

  const clients = await getSenderReceiverClients(
    ns,
    TestClientType.TopicFilterTestTopic,
    receiverType
  );
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
