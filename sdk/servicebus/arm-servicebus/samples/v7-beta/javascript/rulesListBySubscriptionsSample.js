// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all the rules within given topic-subscription
 *
 * @summary list all the rules within given topic-subscription
 * x-ms-original-file: 2025-05-01-preview/Rules/RuleListBySubscription.json
 */
async function rulesListBySubscriptions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.rules.listBySubscriptions(
    "ArunMonocle",
    "sdk-Namespace-1319",
    "sdk-Topics-2081",
    "sdk-Subscriptions-8691",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await rulesListBySubscriptions();
}

main().catch(console.error);
