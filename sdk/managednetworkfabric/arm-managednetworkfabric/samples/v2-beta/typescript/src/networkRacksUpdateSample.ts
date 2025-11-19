// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update certain properties of the Network Rack resource.
 *
 * @summary update certain properties of the Network Rack resource.
 * x-ms-original-file: 2024-06-15-preview/NetworkRacks_Update.json
 */
async function networkRacksUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkRacks.update("example-rg", "example-rack", {
    tags: { keyId: "keyValue" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await networkRacksUpdateMaximumSetGen();
}

main().catch(console.error);
