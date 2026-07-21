// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a new Alias(Disaster Recovery configuration)
 *
 * @summary creates or updates a new Alias(Disaster Recovery configuration)
 * x-ms-original-file: 2026-01-01/disasterRecoveryConfigs/EHAliasCreate.json
 */
async function ehAliasCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "exampleSubscriptionId";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.disasterRecoveryConfigs.createOrUpdate(
    "exampleResourceGroup",
    "sdk-Namespace-8859",
    "sdk-DisasterRecovery-3814",
    { partnerNamespace: "sdk-Namespace-37" },
  );
  console.log(result);
}

async function main() {
  await ehAliasCreate();
}

main().catch(console.error);
