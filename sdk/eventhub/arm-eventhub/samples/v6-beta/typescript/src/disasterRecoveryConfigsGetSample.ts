// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves Alias(Disaster Recovery configuration) for primary or secondary namespace
 *
 * @summary retrieves Alias(Disaster Recovery configuration) for primary or secondary namespace
 * x-ms-original-file: 2026-01-01/disasterRecoveryConfigs/EHAliasGet.json
 */
async function ehAliasGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "exampleSubscriptionId";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.disasterRecoveryConfigs.get(
    "exampleResourceGroup",
    "sdk-Namespace-8859",
    "sdk-DisasterRecovery-3814",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await ehAliasGet();
}

main().catch(console.error);
