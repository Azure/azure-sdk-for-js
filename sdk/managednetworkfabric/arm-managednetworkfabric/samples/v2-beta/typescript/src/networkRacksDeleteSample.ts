// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete Network Rack resource.
 *
 * @summary delete Network Rack resource.
 * x-ms-original-file: 2024-06-15-preview/NetworkRacks_Delete.json
 */
async function networkRacksDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  await client.networkRacks.delete("example-rg", "example-rack");
}

async function main(): Promise<void> {
  await networkRacksDeleteMaximumSetGen();
}

main().catch(console.error);
