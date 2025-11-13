// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete Network Tap Rule resource.
 *
 * @summary delete Network Tap Rule resource.
 * x-ms-original-file: 2024-06-15-preview/NetworkTapRules_Delete.json
 */
async function networkTapRulesDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  await client.networkTapRules.delete("example-rg", "example-tapRule");
}

async function main(): Promise<void> {
  await networkTapRulesDeleteMaximumSetGen();
}

main().catch(console.error);
