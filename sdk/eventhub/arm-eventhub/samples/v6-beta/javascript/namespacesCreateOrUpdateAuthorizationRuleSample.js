// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an AuthorizationRule for a Namespace.
 *
 * @summary creates or updates an AuthorizationRule for a Namespace.
 * x-ms-original-file: 2026-01-01/NameSpaces/EHNameSpaceAuthorizationRuleCreate.json
 */
async function nameSpaceAuthorizationRuleCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.namespaces.createOrUpdateAuthorizationRule(
    "ArunMonocle",
    "sdk-Namespace-2702",
    "sdk-Authrules-1746",
    { rights: ["Listen", "Send"] },
  );
  console.log(result);
}

async function main() {
  await nameSpaceAuthorizationRuleCreate();
}

main().catch(console.error);
