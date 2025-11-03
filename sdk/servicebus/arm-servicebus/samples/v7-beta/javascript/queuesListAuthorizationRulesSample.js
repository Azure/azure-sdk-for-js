// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all authorization rules for a queue.
 *
 * @summary gets all authorization rules for a queue.
 * x-ms-original-file: 2025-05-01-preview/Queues/SBQueueAuthorizationRuleListAll.json
 */
async function queueAuthorizationRuleListAll() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.queues.listAuthorizationRules(
    "ArunMonocle",
    "sdk-Namespace-7982",
    "sdk-Queues-2317",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await queueAuthorizationRuleListAll();
}

main().catch(console.error);
