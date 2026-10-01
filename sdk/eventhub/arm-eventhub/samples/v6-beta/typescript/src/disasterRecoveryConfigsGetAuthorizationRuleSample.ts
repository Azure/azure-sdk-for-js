// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an AuthorizationRule for a Namespace by rule name.
 *
 * @summary gets an AuthorizationRule for a Namespace by rule name.
 * x-ms-original-file: 2026-01-01/disasterRecoveryConfigs/EHAliasAuthorizationRuleGet.json
 */
async function nameSpaceAuthorizationRuleGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "exampleSubscriptionId";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.disasterRecoveryConfigs.getAuthorizationRule(
    "exampleResourceGroup",
    "sdk-Namespace-9080",
    "sdk-DisasterRecovery-4879",
    "sdk-Authrules-4879",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await nameSpaceAuthorizationRuleGet();
}

main().catch(console.error);
