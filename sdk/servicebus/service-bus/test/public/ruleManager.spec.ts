// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CorrelationRuleFilter,
  RuleProperties,
  ServiceBusMessage,
  ServiceBusSender,
  SqlRuleAction,
  SqlRuleFilter,
} from "../../src";
import { TestClientType } from "../public/utils/testUtils";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import {
  ServiceBusClientForTests,
  createServiceBusClientForTests,
} from "../public/utils/testutils2";
import { recreateSubscription } from "./utils/managementUtils";
chai.use(chaiAsPromised);
const assert = chai.assert;

const defaultRuleName = "$Default";
interface Order {
  color: string;
  quantity: number;
  priority: string;
}
const orders: Order[] = [
  { color: "blue", quantity: 5, priority: "low" },
  { color: "red", quantity: 10, priority: "high" },
  { color: "yellow", quantity: 5, priority: "low" },
  { color: "blue", quantity: 10, priority: "low" },
  { color: "blue", quantity: 5, priority: "high" },
  { color: "blue", quantity: 10, priority: "low" },
  { color: "red", quantity: 5, priority: "low" },
  { color: "red", quantity: 10, priority: "low" },
  { color: "red", quantity: 5, priority: "low" },
  { color: "yellow", quantity: 10, priority: "high" },
  { color: "yellow", quantity: 5, priority: "low" },
  { color: "yellow", quantity: 10, priority: "low" },
];

/**
 * testing helper for convenience
 */
async function getRules(ruleManager: any): Promise<RuleProperties[]> {
  return (await ruleManager.getRules()) as RuleProperties[];
}

/**
 * A basic suite that exercises most of the core functionality.
 */
describe("RuleManager tests", () => {
  let serviceBusClient: ServiceBusClientForTests;

  before(async () => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(() => {
    return serviceBusClient.test.after();
  });
  describe("subscriptions", () => {
    let sender: ServiceBusSender;
    let topic: string;
    let subscription: string;

    before(async () => {
      const entity = await serviceBusClient.test.createTestEntities(
        TestClientType.UnpartitionedSubscription
      );

      topic = entity.topic!;
      subscription = entity.subscription!;
    });

    beforeEach(async () => {
      sender = serviceBusClient.test.addToCleanup(serviceBusClient.createSender(topic));
      await recreateSubscription(topic, subscription, { deleteFirst: true });
    });

    afterEach(async () => {
      return serviceBusClient.test.afterEach();
    });

    it("add rules", async () => {
      const ruleManager = serviceBusClient.createRuleManager(topic, subscription);

      const sqlRuleName = "sqlRule";
      const correlationRuleName = "correlationRule";

      let rules = await getRules(ruleManager);
      assert.equal(rules.length, 1); // default rule
      const firstRule = rules[0];
      assert.equal(firstRule.name, defaultRuleName);
      assert.deepStrictEqual(firstRule.action, {});

      await ruleManager.createRule(sqlRuleName, {
        sqlExpression: "price > 10",
      });

      const applicationProperties = {
        key1: "value1",
        key2: 2,
        key3: true,
        key4: new Date("01/01/2000"),
      };
      const correlationRuleFilter: CorrelationRuleFilter = {
        correlationId: "correlationId",
        subject: "label",
        messageId: "messageId",
        applicationProperties,
        replyTo: "replyTo",
        replyToSessionId: "replyToSessionId",
        sessionId: "sessionId",
        to: "to",
      };
      const action: SqlRuleAction = {
        sqlExpression: "Set CorrelationId = 'newValue'",
      };
      await ruleManager.createRule(correlationRuleName, correlationRuleFilter, action);

      rules = await getRules(ruleManager);
      assert.equal(rules.length, 3);

      const sqlRules = rules.filter((r) => r.name === sqlRuleName);
      assert.ok(sqlRules.length >= 1, "expecting at least one sql rule");
      assert.ok(sqlRules[0], "expecting valid sql rule");
      const sqlRule = sqlRules[0];
      assert.equal((sqlRule.filter as SqlRuleFilter).sqlExpression, "price > 10");

      const correlationRules = rules.filter((r) => r.name === correlationRuleName);
      assert.ok(correlationRules.length >= 1, "expecting at least one correlation rule");
      assert.ok(correlationRules[0], "expecting valid correlation rule");
      const correlationRule = correlationRules[0];
      assert.equal(correlationRule.action.sqlExpression, "Set CorrelationId = 'newValue'");
      assert.ok(correlationRule.filter);
      const correlationFilter = correlationRule.filter as CorrelationRuleFilter;
      assert.equal(correlationFilter.correlationId, "correlationId");
      assert.equal(correlationFilter.subject, "label");
      assert.equal(correlationFilter.messageId, "messageId");
      assert.equal(correlationFilter.replyTo, "replyTo");
      assert.equal(correlationFilter.replyToSessionId, "replyToSessionId");
      assert.equal(correlationFilter.sessionId, "sessionId");
      assert.equal(correlationFilter.to, "to");
      assert.deepStrictEqual(correlationFilter.applicationProperties, applicationProperties);
    });

    it("list rules", async () => {
      const ruleManager = serviceBusClient.createRuleManager(topic, subscription);

      const sqlRuleName = "sqlRule";
      const correlationRuleName = "correlationRule";

      const rules = await getRules(ruleManager);
      assert.equal(rules.length, 1); // default rule
      const firstRule = rules[0];
      assert.equal(firstRule.name, defaultRuleName);

      await ruleManager.createRule(sqlRuleName, {
        sqlExpression: "price > 10",
      });

      const applicationProperties = {
        key1: "value1",
      };
      const correlationRuleFilter: CorrelationRuleFilter = {
        correlationId: "correlationId",
        subject: "label",
        messageId: "messageId",
        applicationProperties,
        replyTo: "replyTo",
        replyToSessionId: "replyToSessionId",
        sessionId: "sessionId",
        to: "to",
      };
      const action: SqlRuleAction = {
        sqlExpression: "Set CorrelationId = 'newValue'",
      };
      await ruleManager.createRule(correlationRuleName, correlationRuleFilter, action);

      const iterator = ruleManager.listRules();
      const result: RuleProperties[] = [];
      for await (const rule of iterator) {
        result.push(rule);
      }
      assert.equal(result.length, 3, "Expecting three rules");
    });

    it("list rules by page specifying page size", async () => {
      const ruleManager = serviceBusClient.createRuleManager(topic, subscription);

      const sqlRuleName = "sqlRule";
      const correlationRuleName = "correlationRule";

      const rules = await getRules(ruleManager);
      assert.equal(rules.length, 1); // default rule
      const firstRule = rules[0];
      assert.equal(firstRule.name, defaultRuleName);

      await ruleManager.createRule(sqlRuleName, {
        sqlExpression: "price > 10",
      });

      const applicationProperties = {
        key1: "value1",
      };
      const correlationRuleFilter: CorrelationRuleFilter = {
        correlationId: "correlationId",
        subject: "label",
        messageId: "messageId",
        applicationProperties,
        replyTo: "replyTo",
        replyToSessionId: "replyToSessionId",
        sessionId: "sessionId",
        to: "to",
      };
      const action: SqlRuleAction = {
        sqlExpression: "Set CorrelationId = 'newValue'",
      };
      await ruleManager.createRule(correlationRuleName, correlationRuleFilter, action);

      const iterator = ruleManager.listRules().byPage({ maxPageSize: 1 });
      let result = await iterator.next();
      assert.equal(result.value.length, 1, "Expecting one rule in first page");
      assert.equal(result.value[0].name, defaultRuleName);
      result = await iterator.next();
      assert.equal(result.value.length, 1, "Expecting one rule in second page");
      assert.equal(result.value[0].name, correlationRuleName);
      result = await iterator.next();
      assert.equal(result.value.length, 1, "Expecting one rule in third page");
      assert.equal(result.value[0].name, sqlRuleName);
      result = await iterator.next();
      assert.equal(result.value, undefined, "Not expecting any more pages");
    });

    it("list rules by page without specifying page size", async () => {
      const ruleManager = serviceBusClient.createRuleManager(topic, subscription);

      const sqlRuleName = "sqlRule";
      const correlationRuleName = "correlationRule";

      const rules = await getRules(ruleManager);
      assert.equal(rules.length, 1); // default rule
      const firstRule = rules[0];
      assert.equal(firstRule.name, defaultRuleName);

      await ruleManager.createRule(sqlRuleName, {
        sqlExpression: "price > 10",
      });

      const applicationProperties = {
        key1: "value1",
      };
      const correlationRuleFilter: CorrelationRuleFilter = {
        correlationId: "correlationId",
        subject: "label",
        messageId: "messageId",
        applicationProperties,
        replyTo: "replyTo",
        replyToSessionId: "replyToSessionId",
        sessionId: "sessionId",
        to: "to",
      };
      const action: SqlRuleAction = {
        sqlExpression: "Set CorrelationId = 'newValue'",
      };
      await ruleManager.createRule(correlationRuleName, correlationRuleFilter, action);

      const iterator = ruleManager.listRules().byPage();
      let result = await iterator.next();
      assert.equal(result.value.length, 3, "Expecting one rule in first page");
      result = await iterator.next();
      assert.equal(result.value, undefined, "Not expecting any more pages");
    });

    it("throws if add rule with same name twice", async () => {
      const ruleManager = serviceBusClient.createRuleManager(topic, subscription);
      const ruleName = "ruleName";
      const filter1: CorrelationRuleFilter = {
        subject: "yellow",
      };
      const filter2: CorrelationRuleFilter = {
        subject: "red",
      };
      await ruleManager.createRule(ruleName, filter1);

      await assert.isRejected(
        ruleManager.createRule(ruleName, filter2),
        /The messaging entity '.*ruleName' already exists./
      );
    });

    it("created true filter works", async () => {
      const ruleManager = serviceBusClient.createRuleManager(topic, subscription);

      const rules = await getRules(ruleManager);
      const filteredRules = rules.filter((r) => r.name === defaultRuleName);
      assert.ok(filteredRules.length >= 1, "expecting at least one rule");
      assert.ok(filteredRules[0], "expecting valid default rule");

      await ruleManager.deleteRule(defaultRuleName);
      await ruleManager.createRule("BooleanFilter", { sqlExpression: "1=1" });

      await sendMessages(sender);

      await receiveAndValidate(serviceBusClient, topic, subscription, orders);
    });

    it("created false filter works", async () => {
      const ruleManager = serviceBusClient.createRuleManager(topic, subscription);

      const rules = await getRules(ruleManager);
      const filteredRules = rules.filter((r) => r.name === defaultRuleName);
      assert.ok(filteredRules.length >= 1, "expecting at least one rule");
      assert.ok(filteredRules[0], "expecting valid default rule");

      await ruleManager.deleteRule(defaultRuleName);
      const ruleName = "BooleanFilter";
      await ruleManager.createRule(ruleName, { sqlExpression: "1=0" });

      await sendMessages(sender);

      const receiver = serviceBusClient.test.addToCleanup(
        serviceBusClient.createReceiver(topic, subscription)
      );

      const received = await receiver.receiveMessages(orders.length, {
        maxWaitTimeInMs: 10 * 1000,
      });

      assert.equal(received.length, 0, "Not expecting any received messages");
    });

    it("created correlation filter on the messages works", async () => {
      const ruleManager = serviceBusClient.createRuleManager(topic, subscription);

      const rules = await getRules(ruleManager);
      const filteredRules = rules.filter((r) => r.name === defaultRuleName);
      assert.ok(filteredRules.length >= 1, "expecting at least one rule");
      assert.ok(filteredRules[0], "expecting valid default rule");

      await ruleManager.deleteRule(defaultRuleName);
      const ruleName = "CorrelationMsgPropertyRule";
      await ruleManager.createRule(ruleName, { subject: "red" });

      await sendMessages(sender);
      const expectedOrders = orders.filter((o) => o.color === "red");
      await receiveAndValidate(serviceBusClient, topic, subscription, expectedOrders);
    });

    it("created correlation filter on the user properties works", async () => {
      const ruleManager = serviceBusClient.createRuleManager(topic, subscription);

      const rules = await getRules(ruleManager);
      const filteredRules = rules.filter((r) => r.name === defaultRuleName);
      assert.ok(filteredRules.length >= 1, "expecting at least one rule");
      assert.ok(filteredRules[0], "expecting valid default rule");

      await ruleManager.deleteRule(defaultRuleName);
      const ruleName = "CorrelationUserPropertyRule";
      await ruleManager.createRule(ruleName, { applicationProperties: { color: "red" } });

      await sendMessages(sender);
      const expectedOrders = orders.filter((o) => o.color === "red");
      await receiveAndValidate(serviceBusClient, topic, subscription, expectedOrders);
    });

    it("created correlation filter with action works", async () => {
      const ruleManager = serviceBusClient.createRuleManager(topic, subscription);

      const rules = await getRules(ruleManager);
      const filteredRules = rules.filter((r) => r.name === defaultRuleName);
      assert.ok(filteredRules.length >= 1, "expecting at least one rule");
      assert.ok(filteredRules[0], "expecting valid default rule");

      await ruleManager.deleteRule(defaultRuleName);
      const ruleName = "CorrelationRuleWithAction";
      await ruleManager.createRule(
        ruleName,
        { applicationProperties: { color: "blue" } },
        { sqlExpression: "Set priority = 'high'" }
      );

      await sendMessages(sender);
      const expectedOrders = orders.filter((o) => o.color === "blue");
      const received = await receiveAndValidate(
        serviceBusClient,
        topic,
        subscription,
        expectedOrders
      );
      received.every((m) =>
        assert.ok(m.applicationProperties, "expecting valid applicationProperties on message")
      );
      received.every((m) => assert.equal(m.applicationProperties!["priority"], "high"));
    });

    it("created sql filter on the message property works", async () => {
      const ruleManager = serviceBusClient.createRuleManager(topic, subscription);

      const rules = await getRules(ruleManager);
      const filteredRules = rules.filter((r) => r.name === defaultRuleName);
      assert.ok(filteredRules.length >= 1, "expecting at least one rule");
      assert.ok(filteredRules[0], "expecting valid default rule");

      await ruleManager.deleteRule(defaultRuleName);
      const ruleName = "SqlMsgPropertyRule";
      await ruleManager.createRule(ruleName, { sqlExpression: "sys.label ='yellow'" });

      await sendMessages(sender);
      const expectedOrders = orders.filter((o) => o.color === "yellow");
      await receiveAndValidate(serviceBusClient, topic, subscription, expectedOrders);
    });

    it("created sql filter on the user properties works", async () => {
      const ruleManager = serviceBusClient.createRuleManager(topic, subscription);

      const rules = await getRules(ruleManager);
      const filteredRules = rules.filter((r) => r.name === defaultRuleName);
      assert.ok(filteredRules.length >= 1, "expecting at least one rule");
      assert.ok(filteredRules[0], "expecting valid default rule");

      await ruleManager.deleteRule(defaultRuleName);
      const ruleName = "SqlUserPropertyRule";
      await ruleManager.createRule(ruleName, { sqlExpression: "Color = 'yellow'" });

      await sendMessages(sender);
      const expectedOrders = orders.filter((o) => o.color === "yellow");
      await receiveAndValidate(serviceBusClient, topic, subscription, expectedOrders);
    });

    it("created sql filter with action works", async () => {
      const ruleManager = serviceBusClient.createRuleManager(topic, subscription);

      const rules = await getRules(ruleManager);
      const filteredRules = rules.filter((r) => r.name === defaultRuleName);
      assert.ok(filteredRules.length >= 1, "expecting at least one rule");
      assert.ok(filteredRules[0], "expecting valid default rule");

      await ruleManager.deleteRule(defaultRuleName);
      const ruleName = "SqlRuleWithAction";
      await ruleManager.createRule(
        ruleName,
        { sqlExpression: "Color = 'blue'" },
        { sqlExpression: "Set priority = 'high'" }
      );

      await sendMessages(sender);
      const expectedOrders = orders.filter((o) => o.color === "blue");
      const received = await receiveAndValidate(
        serviceBusClient,
        topic,
        subscription,
        expectedOrders
      );
      received.every((m) =>
        assert.ok(m.applicationProperties, "expecting valid applicationProperties on message")
      );
      received.every((m) => assert.equal(m.applicationProperties!["priority"], "high"));
    });
  });
});

async function sendMessages(sender: ServiceBusSender): Promise<void> {
  sender.sendMessages(
    orders.map((order) => ({
      body: "body",
      correlationId: order.priority,
      subject: order.color,
      applicationProperties: order as unknown as Record<string, string | number>,
    }))
  );
}

async function receiveAndValidate(
  serviceBusClient: ServiceBusClientForTests,
  topicName: string,
  subscriptionName: string,
  expectedOrders: Order[]
) {
  const receiver = serviceBusClient.test.addToCleanup(
    serviceBusClient.createReceiver(topicName, subscriptionName)
  );

  const received: ServiceBusMessage[] = [];
  let current = 0;
  while (current < expectedOrders.length) {
    for await (const message of receiver.getMessageIterator()) {
      received.push(message);
      await receiver.completeMessage(message);
      assert.equal(message.subject, expectedOrders[current].color);
      current++;
      break;
    }
  }
  return received;
}
