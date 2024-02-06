// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT Licence.

/**
 * This sample demonstrates how to use RuleManager to create, list, and delete subscription-level rules.
 * Managing subscription-level rules only requires **Listen** claim.
 *
 *
 * @summary Demonstrates how to manage subscription-level rules using RuleManager.
 */

const { ServiceBusAdministrationClient, ServiceBusClient } = require("@azure/service-bus");
require("dotenv").config();

async function main() {
  // Define connection string and related Service Bus entity names here
  const connectionString = process.env.SERVICEBUS_CONNECTION_STRING || "<connection string>";
  const serviceBusAdminClient = new ServiceBusAdministrationClient(connectionString);
  const topicName = "topic-rulemanager-sample" + new Date().getTime();
  const subscriptionName = "subscription-rule-manager";
  console.log("Creating topic and subscription...");
  await serviceBusAdminClient.createTopic(topicName);
  await serviceBusAdminClient.createSubscription(topicName, subscriptionName);

  // for simplicity of this sample, we are using the same connection string for the ServiceBusclient instance.
  // However, the connection string could be a different one, e.g., a SAS connection string with only
  // Listen claim for a specific topic.
  const client = new ServiceBusClient(connectionString);
  const ruleManager = client.createRuleManager(topicName, subscriptionName);

  console.log("Listing all rules...");
  let ruleIterator = ruleManager.listRules();
  for await (const rule of ruleIterator) {
    console.log(rule);
  }

  console.log("Creating rules...");
  const sqlFilter = { sqlExpression: "price > 10" };
  await ruleManager.createRule("sqlRule", sqlFilter);

  const applicationProperties = {
    key1: "value1",
    key2: 2,
    key3: true,
    key4: new Date("01/01/2000"),
  };
  const correlationRuleFilter = {
    correlationId: "correlationId",
    subject: "label",
    messageId: "messageId",
    applicationProperties,
    replyTo: "replyTo",
    replyToSessionId: "replyToSessionId",
    sessionId: "sessionId",
    to: "to",
  };
  await ruleManager.createRule("correlationRule", correlationRuleFilter);

  console.log("Listing all rules again...");
  ruleIterator = ruleManager.listRules();
  for await (const rule of ruleIterator) {
    console.log(rule);
  }

  console.log("Listing rules by page of size 2...");
  const pageIterator = ruleManager.listRules().byPage({ maxPageSize: 2 });
  let i = 1;
  for await (const page of pageIterator) {
    console.log("  page ", i++);
    console.log(
      "    ",
      page.map((r) => r.name)
    );
  }

  console.log("Deleting rules...");
  await ruleManager.deleteRule("sqlRule");
  await ruleManager.deleteRule("correlationRule");

  console.log("Listing all rules again...");
  ruleIterator = ruleManager.listRules();
  // should only print out $Default
  for await (const rule of ruleIterator) {
    console.log(rule.name);
  }

  console.log("Deleting topic...");
  await serviceBusAdminClient.deleteTopic(topicName);
  client.close();
}

main().catch((err) => {
  console.log("RuleManager Sample - Error occurred: ", err);
  process.exit(1);
});
