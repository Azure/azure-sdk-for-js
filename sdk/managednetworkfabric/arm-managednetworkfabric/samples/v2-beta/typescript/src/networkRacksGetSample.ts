// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get Network Rack resource details.
 *
 * @summary get Network Rack resource details.
 * x-ms-original-file: 2024-06-15-preview/NetworkRacks_Get.json
 */
async function networkRacksGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkRacks.get("example-rg", "example-rack");
  console.log(result);
}

async function main(): Promise<void> {
  await networkRacksGetMaximumSetGen();
}

main().catch(console.error);
