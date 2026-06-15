// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an Alias(Disaster Recovery configuration)
 *
 * @summary deletes an Alias(Disaster Recovery configuration)
 * x-ms-original-file: 2026-01-01/disasterRecoveryConfigs/EHAliasDelete.json
 */
async function ehAliasDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "exampleSubscriptionId";
  const client = new EventHubManagementClient(credential, subscriptionId);
  await client.disasterRecoveryConfigs.delete(
    "exampleResourceGroup",
    "sdk-Namespace-5849",
    "sdk-DisasterRecovery-3814",
  );
}

async function main() {
  await ehAliasDelete();
}

main().catch(console.error);
