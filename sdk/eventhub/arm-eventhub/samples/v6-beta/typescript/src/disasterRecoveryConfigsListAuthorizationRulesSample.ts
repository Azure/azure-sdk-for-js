// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of authorization rules for a Namespace.
 *
 * @summary gets a list of authorization rules for a Namespace.
 * x-ms-original-file: 2026-01-01/disasterRecoveryConfigs/EHAliasAuthorizationRuleListAll.json
 */
async function listAuthorizationRules(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "exampleSubscriptionId";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.disasterRecoveryConfigs.listAuthorizationRules(
    "exampleResourceGroup",
    "sdk-Namespace-9080",
    "sdk-DisasterRecovery-4047",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAuthorizationRules();
}

main().catch(console.error);
