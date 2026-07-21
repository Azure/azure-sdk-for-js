// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to check the give Namespace name availability.
 *
 * @summary check the give Namespace name availability.
 * x-ms-original-file: 2026-01-01/disasterRecoveryConfigs/EHAliasCheckNameAvailability.json
 */
async function namespacesCheckNameAvailability(): Promise<void> {
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

async function main(): Promise<void> {
  await namespacesCheckNameAvailability();
}

main().catch(console.error);
