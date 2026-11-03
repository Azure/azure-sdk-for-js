// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to regenerates the primary or secondary connection strings for the specified Namespace.
 *
 * @summary regenerates the primary or secondary connection strings for the specified Namespace.
 * x-ms-original-file: 2026-01-01/NameSpaces/EHNameSpaceAuthorizationRuleRegenerateKey.json
 */
async function nameSpaceAuthorizationRuleRegenerateKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.namespaces.regenerateKeys(
    "ArunMonocle",
    "sdk-Namespace-8980",
    "sdk-Authrules-8929",
    { keyType: "PrimaryKey" },
  );
  console.log(result);
}

async function main() {
  await nameSpaceAuthorizationRuleRegenerateKey();
}

main().catch(console.error);
