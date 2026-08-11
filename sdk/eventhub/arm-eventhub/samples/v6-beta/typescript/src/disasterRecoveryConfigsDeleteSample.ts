// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an Alias(Disaster Recovery configuration)
 *
 * @summary deletes an Alias(Disaster Recovery configuration)
 * x-ms-original-file: 2026-01-01/disasterRecoveryConfigs/EHAliasDelete.json
 */
async function ehAliasDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "exampleSubscriptionId";
  const client = new EventHubManagementClient(credential, subscriptionId);
  await client.disasterRecoveryConfigs.delete(
    "exampleResourceGroup",
    "sdk-Namespace-5849",
    "sdk-DisasterRecovery-3814",
  );
}

async function main(): Promise<void> {
  await ehAliasDelete();
}

main().catch(console.error);
