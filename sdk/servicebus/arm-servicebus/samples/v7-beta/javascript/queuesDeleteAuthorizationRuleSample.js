// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a queue authorization rule.
 *
 * @summary deletes a queue authorization rule.
 * x-ms-original-file: 2025-05-01-preview/Queues/SBQueueAuthorizationRuleDelete.json
 */
async function queueAuthorizationRuleDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  await client.queues.deleteAuthorizationRule(
    "ArunMonocle",
    "sdk-namespace-7982",
    "sdk-Queues-2317",
    "sdk-AuthRules-5800",
  );
}

async function main() {
  await queueAuthorizationRuleDelete();
}

main().catch(console.error);
