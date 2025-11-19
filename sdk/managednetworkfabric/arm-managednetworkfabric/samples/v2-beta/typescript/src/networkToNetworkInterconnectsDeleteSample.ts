// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to implements NetworkToNetworkInterconnects DELETE method.
 *
 * @summary implements NetworkToNetworkInterconnects DELETE method.
 * x-ms-original-file: 2024-06-15-preview/NetworkToNetworkInterconnects_Delete.json
 */
async function networkToNetworkInterconnectsDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  await client.networkToNetworkInterconnects.delete("example-rg", "example-nf", "example-nni");
}

async function main(): Promise<void> {
  await networkToNetworkInterconnectsDeleteMaximumSetGen();
}

main().catch(console.error);
