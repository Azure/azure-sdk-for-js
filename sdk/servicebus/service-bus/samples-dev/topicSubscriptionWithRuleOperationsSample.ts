// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * This sample demonstrates the topic filter functionality in Service Bus.
 * It follows similar functionality to TopicSubscriptionWithRuleOperationsSample/program.cs
 *
 * https://github.com/Azure/azure-service-bus/blob/master/samples/DotNet/GettingStarted/Microsoft.Azure.ServiceBus/TopicSubscriptionWithRuleOperationsSample/Program.cs
 *
 * @summary Demonstrates how to filter messages in Service Bus
 * @azsdk-weight 100
 */

import {
  ServiceBusClient,
  ServiceBusAdministrationClient,
  ServiceBusMessage,
} from "@azure/service-bus";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICEBUS_CONNECTION_STRING || "<connection string>";
const topicName = "TopicSubscriptionWithRuleOperationsSample" + new Date().getTime();
const DEFAULT_RULE_NAME = "$Default";

const firstSetOfMessages: ServiceBusMessage[] = [
  { subject: "Red", body: "test-red1" },
  { subject: "Red", body: "test-red2", correlationId: "notimportant" },
  { subject: "Red", body: "test-red3", correlationId: "important" },
  { subject: "Blue", body: "test-blue1" },
  { subject: "Blue", body: "test-blue2", correlationId: "notimportant" },
  { subject: "Blue", body: "test-blue3", correlationId: "important" },
  { subject: "Green", body: "test-green1" },
  { subject: "Green", body: "test-green2", correlationId: "notimportant" },
  { subject: "Green", body: "test-green3", correlationId: "important" },
];

const NoFilterSubscriptionName = "NoFilterSubscription";
const SqlFilterOnlySubscriptionName = "RedSqlFilterSubscription";
const SqlFilterWithActionSubscriptionName = "BlueSqlFilterWithActionSubscription";
const CorrelationFilterSubscriptionName = "ImportantCorrelationFilterSubscription";

export async function main() {
  const sbClient = new ServiceBusClient(connectionString);
  const sbAdminClient = new ServiceBusAdministrationClient(connectionString);

  await sbAdminClient.createTopic(topicName);

  await sbAdminClient.createSubscription(topicName, NoFilterSubscriptionName);
  await sbAdminClient.deleteRule(topicName, NoFilterSubscriptionName, DEFAULT_RULE_NAME);
  await sbAdminClient.createRule(topicName, NoFilterSubscriptionName, DEFAULT_RULE_NAME, {
    sqlExpression: "1=1",
  });

  await sbAdminClient.createSubscription(topicName, SqlFilterOnlySubscriptionName, {
    defaultRuleOptions: {
      name: "RedSqlRule",
      filter: { sqlExpression: "Color = 'Red'" },
    },
  });

  await sbAdminClient.createSubscription(topicName, SqlFilterWithActionSubscriptionName, {
    defaultRuleOptions: {
      name: "BlueSqlRule",
      filter: { sqlExpression: "Color = 'Blue'" },
      action: { sqlExpression: "SET Color = 'BlueProcessed'" },
    },
  });

  await sbAdminClient.createSubscription(topicName, CorrelationFilterSubscriptionName, {
    defaultRuleOptions: {
      name: "ImportantCorrelationRule",
      filter: { subject: "Red", correlationId: "important" },
    },
  });

  /**
   * CURRENTLY REFERENCING
   * sdk/servicebus/service-bus/test/internal/atomE2ETests.spec.ts
   * for guidance on method usage with topics
   */

  await sbClient.createSender(topicName).sendMessages(firstSetOfMessages);
  const receivedMessages = await sbClient
    .createReceiver(topicName, CorrelationFilterSubscriptionName)
    .receiveMessages(10);

  for (const msg of receivedMessages) {
    // should be test-red3 only
    console.log(`Received message: ${msg.body}`);
  }

  await sbAdminClient.deleteSubscription(topicName, NoFilterSubscriptionName);
  await sbAdminClient.deleteSubscription(topicName, SqlFilterOnlySubscriptionName);
  await sbAdminClient.deleteSubscription(topicName, SqlFilterWithActionSubscriptionName);
  await sbAdminClient.deleteSubscription(topicName, CorrelationFilterSubscriptionName);
  await sbClient.close();
}

main().catch((err) => {
  console.log("sendMessages Sample: Error occurred: ", err);
  process.exit(1);
});
