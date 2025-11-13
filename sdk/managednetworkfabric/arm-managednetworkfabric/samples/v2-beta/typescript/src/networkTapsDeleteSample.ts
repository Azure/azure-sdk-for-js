// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes Network Tap.
 *
 * @summary deletes Network Tap.
 * x-ms-original-file: 2024-06-15-preview/NetworkTaps_Delete.json
 */
async function networkTapsDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  await client.networkTaps.delete("example-rg", "example-networkTap");
}

async function main(): Promise<void> {
  await networkTapsDeleteMaximumSetGen();
}

main().catch(console.error);
