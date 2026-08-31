// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the primary and secondary connection strings for the Namespace.
 *
 * @summary gets the primary and secondary connection strings for the Namespace.
 * x-ms-original-file: 2026-01-01/NameSpaces/EHNameSpaceAuthorizationRuleListKey.json
 */
async function nameSpaceAuthorizationRuleListKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.namespaces.listKeys(
    "ArunMonocle",
    "sdk-Namespace-2702",
    "sdk-Authrules-1746",
  );
  console.log(result);
}

async function main() {
  await nameSpaceAuthorizationRuleListKey();
}

main().catch(console.error);
