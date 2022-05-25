// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CorrelationRuleFilter,
  // ServiceBusSender,
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
chai.use(chaiAsPromised);
const assert = chai.assert;

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
    // let sender: ServiceBusSender;
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
      // sender = serviceBusClient.test.addToCleanup(serviceBusClient.createSender(topic));
    });

    afterEach(async () => {
      return serviceBusClient.test.afterEach();
    });

    it("add get and remove rule", async () => {
      const ruleManager = serviceBusClient.createRuleManager(topic, subscription);

      const sqlRuleName = "sqlRule";
      const correlationRuleName = "correlationRule";

      let rules = await ruleManager.getRules();
      assert.equal(rules.length, 1); // default rule
      const firstRule = rules[0];
      assert.equal(firstRule.name, "$Default");
      assert.deepStrictEqual(firstRule.action, {});

      await ruleManager.createRule(sqlRuleName, {
          sqlExpression: "price > 10"
        });

      const correlationRuleFilter: CorrelationRuleFilter = {
        correlationId: "correlationId",
        subject: "label",
        messageId: "messageId",
        applicationProperties: {
          key1: "value1"
        },
        replyTo: "replyTo",
        replyToSessionId: "replyToSessionId",
        sessionId: "sessionId",
        to: "to"
      };
      const action: SqlRuleAction = {
        sqlExpression: "Set CorrelationId = 'newValue'",
      }
      await ruleManager.createRule(correlationRuleName, correlationRuleFilter, action);

      rules = await ruleManager.getRules();
      assert.equal(rules.length, 3);

      const sqlRules = rules.filter(r => r.name === sqlRuleName);
      assert.ok(sqlRules.length >= 1, "expecting at least one sql rule")
      assert.ok(sqlRules[0], "expecting valid sql rule");
      const sqlRule = sqlRules[0];
      assert.equal((sqlRule.filter as SqlRuleFilter).sqlExpression, "price > 10");

      const correlationRules = rules.filter(r => r.name === correlationRuleName);
      assert.ok(correlationRules.length >= 1, "expecting at least one correlation rule")
      assert.ok(correlationRules[0], "expecting valid correlation rule")
      const correlationRule = correlationRules[0];
      console.log("### correlation rule ", correlationRule);
      assert.equal(correlationRule.action.sqlExpression, "Set CorrelationId = 'newValue'")
      assert.ok(correlationRule.filter);
      const correlationFilter = correlationRule.filter as CorrelationRuleFilter;
      assert.equal(correlationFilter.correlationId, "correlationId")
      assert.equal(correlationFilter.subject, "label")
      assert.equal(correlationFilter.messageId, "messageId")
      assert.equal(correlationFilter.replyTo, "replyTo")
      assert.equal(correlationFilter.replyToSessionId, "replyToSessionId")
      assert.equal(correlationFilter.sessionId, "sessionId")
      assert.equal(correlationFilter.to, "to")
      assert.deepStrictEqual(correlationFilter.applicationProperties, {
        key1: "value1"
      })
    });
  });
});
