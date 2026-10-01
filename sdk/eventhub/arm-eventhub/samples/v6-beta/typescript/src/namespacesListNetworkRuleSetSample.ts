// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets NetworkRuleSet for a Namespace.
 *
 * @summary gets NetworkRuleSet for a Namespace.
 * x-ms-original-file: 2026-01-01/NameSpaces/VirtualNetworkRule/EHNetworkRuleSetList.json
 */
async function nameSpaceNetworkRuleSetList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "Subscription";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.namespaces.listNetworkRuleSet("ResourceGroup", "sdk-Namespace-6019");
  console.log(result);
}

async function main(): Promise<void> {
  await nameSpaceNetworkRuleSetList();
}

main().catch(console.error);
