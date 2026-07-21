// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an AuthorizationRule for a Namespace by rule name.
 *
 * @summary gets an AuthorizationRule for a Namespace by rule name.
 * x-ms-original-file: 2026-01-01/NameSpaces/EHNameSpaceAuthorizationRuleGet.json
 */
async function nameSpaceAuthorizationRuleGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.namespaces.getAuthorizationRule(
    "ArunMonocle",
    "sdk-Namespace-2702",
    "sdk-Authrules-1746",
  );
  console.log(result);
}

async function main() {
  await nameSpaceAuthorizationRuleGet();
}

main().catch(console.error);
