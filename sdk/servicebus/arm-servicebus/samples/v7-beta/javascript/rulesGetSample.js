// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the description for the specified rule.
 *
 * @summary retrieves the description for the specified rule.
 * x-ms-original-file: 2025-05-01-preview/Rules/RuleGet.json
 */
async function rulesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.rules.get(
    "ArunMonocle",
    "sdk-Namespace-1319",
    "sdk-Topics-2081",
    "sdk-Subscriptions-8691",
    "sdk-Rules-6571",
  );
  console.log(result);
}

async function main() {
  await rulesGet();
}

main().catch(console.error);
