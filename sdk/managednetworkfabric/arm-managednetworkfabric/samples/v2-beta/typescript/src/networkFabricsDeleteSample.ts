// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete Network Fabric resource.
 *
 * @summary delete Network Fabric resource.
 * x-ms-original-file: 2024-06-15-preview/NetworkFabrics_Delete.json
 */
async function networkFabricsDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  await client.networkFabrics.delete("example-rg", "example-fabric");
}

async function main(): Promise<void> {
  await networkFabricsDeleteMaximumSetGen();
}

main().catch(console.error);
