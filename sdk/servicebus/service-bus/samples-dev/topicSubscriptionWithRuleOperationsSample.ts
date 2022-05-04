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

import { ServiceBusClient } from "@azure/service-bus";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICEBUS_CONNECTION_STRING || "<connection string>";
const topicName = process.env.TOPIC_NAME || "<topic name>";

// Simply create 4 default subscriptions (no rules specified explicitly) and provide subscription names.
// The Rule addition will be done as part of the sample depending on the subscription behavior expected.
const allMessagesSubscriptionName = process.env.SUBSCRIPTION_NAME_1 || "<subscription name 1>";
const sqlFilterOnlySubscriptionName = process.env.SUBSCRIPTION_NAME_2 || "<subscription name 2>";
const sqlFilterWithActionSubscriptionName = process.env.SUBSCRIPTION_NAME_3 || "<subscription name 3>";
const correlationFilterSubscriptionName = process.env.SUBSCRIPTION_NAME_4 || "<subscription name 4>";

export async function main() {
  const sbClient = new ServiceBusClient(connectionString);

}
