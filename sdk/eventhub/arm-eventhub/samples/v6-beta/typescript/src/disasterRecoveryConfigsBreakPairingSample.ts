// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation disables the Disaster Recovery and stops replicating changes from primary to secondary namespaces
 *
 * @summary this operation disables the Disaster Recovery and stops replicating changes from primary to secondary namespaces
 * x-ms-original-file: 2026-01-01/disasterRecoveryConfigs/EHAliasBreakPairing.json
 */
async function ehAliasBreakPairing(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "exampleSubscriptionId";
  const client = new EventHubManagementClient(credential, subscriptionId);
  await client.disasterRecoveryConfigs.breakPairing(
    "exampleResourceGroup",
    "sdk-Namespace-8859",
    "sdk-DisasterRecovery-3814",
  );
}

async function main(): Promise<void> {
  await ehAliasBreakPairing();
}

main().catch(console.error);
