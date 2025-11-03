// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to regenerates the primary or secondary connection strings for the namespace.
 *
 * @summary regenerates the primary or secondary connection strings for the namespace.
 * x-ms-original-file: 2025-05-01-preview/NameSpaces/SBNameSpaceAuthorizationRuleRegenerateKey.json
 */
async function nameSpaceAuthorizationRuleRegenerateKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.namespaces.regenerateKeys(
    "ArunMonocle",
    "sdk-namespace-6914",
    "sdk-AuthRules-1788",
    { keyType: "PrimaryKey" },
  );
  console.log(result);
}

async function main() {
  await nameSpaceAuthorizationRuleRegenerateKey();
}

main().catch(console.error);
