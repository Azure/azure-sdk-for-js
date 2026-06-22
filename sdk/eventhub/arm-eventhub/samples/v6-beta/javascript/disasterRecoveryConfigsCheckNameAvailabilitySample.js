// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to check the give Namespace name availability.
 *
 * @summary check the give Namespace name availability.
 * x-ms-original-file: 2026-01-01/disasterRecoveryConfigs/EHAliasCheckNameAvailability.json
 */
async function namespacesCheckNameAvailability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "exampleSubscriptionId";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.disasterRecoveryConfigs.checkNameAvailability(
    "exampleResourceGroup",
    "sdk-Namespace-9080",
    { name: "sdk-DisasterRecovery-9474" },
  );
  console.log(result);
}

async function main() {
  await namespacesCheckNameAvailability();
}

main().catch(console.error);
