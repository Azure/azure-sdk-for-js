// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets NetworkRuleSet for a Namespace.
 *
 * @summary gets NetworkRuleSet for a Namespace.
 * x-ms-original-file: 2026-01-01/NameSpaces/VirtualNetworkRule/EHNetworkRuleSetGet.json
 */
async function nameSpaceNetworkRuleSetGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "Subscription";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.namespaces.getNetworkRuleSet("ResourceGroup", "sdk-Namespace-6019");
  console.log(result);
}

async function main(): Promise<void> {
  await nameSpaceNetworkRuleSetGet();
}

main().catch(console.error);
