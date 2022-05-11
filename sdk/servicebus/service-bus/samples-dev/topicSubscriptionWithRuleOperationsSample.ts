// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT Licence.

/**
 * This sample demonstrates the topic filter functionality in Service Bus.
 * It follows similar functionality to TopicSubscriptionWithRuleOperationsSample/program.cs
 *
 *
 * @summary Demonstrates how to filter messages in Service Bus
 * @azsdk-weight 100
 */

import { ServiceBusClient, ServiceBusAdministrationClient, ServiceBusMessage } from "@azure/service-bus";
import { DEFAULT_RULE_NAME } from "../src/util/constants";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICEBUS_CONNECTION_STRING || "<connection string>";
const topicName = "TopicSubscriptionWithRuleOperationsSample";

const firstSetOfMessages: ServiceBusMessage[] = [
  { subject: "Red", body: "test"},
  { subject: "Red", body: "test", correlationId: "notimportant"},
  { subject: "Red", body: "test", correlationId: "important"},
  { subject: "Blue", body: "test"},
  { subject: "Blue", body: "test", correlationId: "notimportant"},
  { subject: "Blue", body: "test", correlationId: "important"},
  { subject: "Green", body: "test"},
  { subject: "Green", body: "test", correlationId: "notimportant"},
  { subject: "Green", body: "test", correlationId: "important"},
];

  const NoFilterSubscriptionName = "NoFilterSubscription";
  const SqlFilterOnlySubscriptionName = "RedSqlFilterSubscription";
  const SqlFilterWithActionSubscriptionName = "BlueSqlFilterWithActionSubscription";
  const CorrelationFilterSubscriptionName = "ImportantCorrelationFilterSubscription";

export async function main() {
  const sbClient = new ServiceBusClient(connectionString);
  const sbAdminClient = new ServiceBusAdministrationClient(connectionString);

  beforeEach(async () => {
    await sbAdminClient.createTopic(topicName);
    await sbAdminClient.createSubscription(topicName, NoFilterSubscriptionName);
    await sbAdminClient.createSubscription(topicName, SqlFilterOnlySubscriptionName);
    await sbAdminClient.createSubscription(topicName, SqlFilterWithActionSubscriptionName);
    await sbAdminClient.createSubscription(topicName, CorrelationFilterSubscriptionName);
    await sbAdminClient.deleteRule(topicName, NoFilterSubscriptionName, DEFAULT_RULE_NAME);
  });

/**
 * CURRENTLY REFERENCING
 * sdk/servicebus/service-bus/test/internal/atomE2ETests.spec.ts
 * for guidance on method usage with topics
 */

  try {
    // Tries to send all messages in a single batch.
    // Will fail if the messages cannot fit in a batch.
    console.log(`Sending the all messages (as an array)`);
    await sbClient.createSender(topicName).sendMessages(firstSetOfMessages);

    // create a topic filter and receive messages, filtering them out
  } finally {
    await sbClient.close();
  }
}

main().catch((err) => {
  console.log("sendMessages Sample: Error occurred: ", err);
  process.exit(1);
});
