// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates an authorization rule for a queue.
 *
 * @summary creates an authorization rule for a queue.
 * x-ms-original-file: 2025-05-01-preview/Queues/SBQueueAuthorizationRuleCreate.json
 */
async function queueAuthorizationRuleCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.queues.createOrUpdateAuthorizationRule(
    "ArunMonocle",
    "sdk-Namespace-7982",
    "sdk-Queues-2317",
    "sdk-AuthRules-5800",
    { properties: { rights: ["Listen", "Send"] } },
  );
  console.log(result);
}

async function main() {
  await queueAuthorizationRuleCreate();
}

main().catch(console.error);
