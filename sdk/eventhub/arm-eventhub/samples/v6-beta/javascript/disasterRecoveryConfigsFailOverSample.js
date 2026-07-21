// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to invokes GEO DR failover and reconfigure the alias to point to the secondary namespace
 *
 * @summary invokes GEO DR failover and reconfigure the alias to point to the secondary namespace
 * x-ms-original-file: 2026-01-01/disasterRecoveryConfigs/EHAliasFailOver.json
 */
async function ehAliasFailOver() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "exampleSubscriptionId";
  const client = new EventHubManagementClient(credential, subscriptionId);
  await client.disasterRecoveryConfigs.failOver(
    "exampleResourceGroup",
    "sdk-Namespace-8859",
    "sdk-DisasterRecovery-3814",
  );
}

async function main() {
  await ehAliasFailOver();
}

main().catch(console.error);
