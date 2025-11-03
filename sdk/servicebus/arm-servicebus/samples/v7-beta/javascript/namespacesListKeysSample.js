// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the primary and secondary connection strings for the namespace.
 *
 * @summary gets the primary and secondary connection strings for the namespace.
 * x-ms-original-file: 2025-05-01-preview/NameSpaces/SBNameSpaceAuthorizationRuleListKey.json
 */
async function nameSpaceAuthorizationRuleListKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.namespaces.listKeys(
    "ArunMonocle",
    "sdk-namespace-6914",
    "sdk-AuthRules-1788",
  );
  console.log(result);
}

async function main() {
  await nameSpaceAuthorizationRuleListKey();
}

main().catch(console.error);
