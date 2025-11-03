// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to primary and secondary connection strings to the queue.
 *
 * @summary primary and secondary connection strings to the queue.
 * x-ms-original-file: 2025-05-01-preview/Queues/SBQueueAuthorizationRuleListKey.json
 */
async function queueAuthorizationRuleListKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.queues.listKeys(
    "ArunMonocle",
    "sdk-namespace-7982",
    "sdk-Queues-2317",
    "sdk-AuthRules-5800",
  );
  console.log(result);
}

async function main() {
  await queueAuthorizationRuleListKey();
}

main().catch(console.error);
