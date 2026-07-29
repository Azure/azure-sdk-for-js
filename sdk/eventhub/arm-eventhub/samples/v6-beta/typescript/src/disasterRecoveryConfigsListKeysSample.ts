// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the primary and secondary connection strings for the Namespace.
 *
 * @summary gets the primary and secondary connection strings for the Namespace.
 * x-ms-original-file: 2026-01-01/disasterRecoveryConfigs/EHAliasAuthorizationRuleListKey.json
 */
async function nameSpaceAuthorizationRuleListKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "exampleSubscriptionId";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.disasterRecoveryConfigs.listKeys(
    "exampleResourceGroup",
    "sdk-Namespace-2702",
    "sdk-DisasterRecovery-4047",
    "sdk-Authrules-1746",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await nameSpaceAuthorizationRuleListKey();
}

main().catch(console.error);
