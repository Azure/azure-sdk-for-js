// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * This sample demonstrates the topic filter functionality in Service Bus.
 * It follows similar functionality to TopicSubscriptionWithRuleOperationsSample/program.cs,
 * found here: https://github.com/Azure/azure-service-bus/blob/master/samples/DotNet/GettingStarted/Microsoft.Azure.ServiceBus/TopicSubscriptionWithRuleOperationsSample/Program.cs
 *
 * @summary Demonstrates how to filter messages in Service Bus
 */

const { ServiceBusClient, ServiceBusAdministrationClient } = require("@azure/service-bus");

// Load the .env file if it exists
require("dotenv").config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICEBUS_CONNECTION_STRING || "<connection string>";
const topicName = "TopicSubscriptionWithRuleOperationsSample" + new Date().getTime();

// Default rule name
const DEFAULT_RULE_NAME = "$Default";

// The messages we want to send
const firstSetOfMessages = [
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

// The subscription names for our topics
const NoFilterSubscriptionName = "NoFilterSubscription";
const SqlFilterOnlySubscriptionName = "RedSqlFilterSubscription";
const SqlFilterWithActionSubscriptionName = "BlueSqlFilterWithActionSubscription";
const CorrelationFilterSubscriptionName = "ImportantCorrelationFilterSubscription";

async function main() {
  const sbClient = new ServiceBusClient(connectionString);
  const sbAdminClient = new ServiceBusAdministrationClient(connectionString);

  // Create the topic
  await sbAdminClient.createTopic(topicName);

  // Create the first subscription, which will not filter anything
  await sbAdminClient.createSubscription(topicName, NoFilterSubscriptionName);
  await sbAdminClient.deleteRule(topicName, NoFilterSubscriptionName, DEFAULT_RULE_NAME);
  await sbAdminClient.createRule(topicName, NoFilterSubscriptionName, DEFAULT_RULE_NAME, {
    sqlExpression: "1=1",
  });

  // Create the next subscription, which will filter out non-red colors
  await sbAdminClient.createSubscription(topicName, SqlFilterOnlySubscriptionName, {
    defaultRuleOptions: {
      name: "RedSqlRule",
      filter: { sqlExpression: "Color = 'Red'" },
    },
  });

  // Create another subscription, which will filter out non-blue colors and set the blue
  // color to BlueProcessed
  await sbAdminClient.createSubscription(topicName, SqlFilterWithActionSubscriptionName, {
    defaultRuleOptions: {
      name: "BlueSqlRule",
      filter: { sqlExpression: "Color = 'Blue'" },
      action: { sqlExpression: "SET Color = 'BlueProcessed'" },
    },
  });

  // Create the last subscription, which will filter out all messages that are not
  // important and not red
  await sbAdminClient.createSubscription(topicName, CorrelationFilterSubscriptionName, {
    defaultRuleOptions: {
      name: "ImportantCorrelationRule",
      filter: { subject: "Red", correlationId: "important" },
    },
  });

  // Send and receive the messages using the CorrelationFilterSubscriptionName filter
  await sbClient.createSender(topicName).sendMessages(firstSetOfMessages);
  const receivedMessages = await sbClient
    .createReceiver(topicName, CorrelationFilterSubscriptionName)
    .receiveMessages(10);

  // Print the received messages
  // should be test-red3 only
  for (const msg of receivedMessages) {
    console.log(`Received message: ${msg.body}`);
  }

  // Clean up the resources
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

module.exports = { main };
