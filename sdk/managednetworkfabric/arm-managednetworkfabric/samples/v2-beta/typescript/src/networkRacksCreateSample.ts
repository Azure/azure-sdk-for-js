// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create Network Rack resource.
 *
 * @summary create Network Rack resource.
 * x-ms-original-file: 2024-06-15-preview/NetworkRacks_Create.json
 */
async function networkRacksCreateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkRacks.create("example-rg", "example-rack", {
    properties: {
      annotation: "annotation",
      networkRackType: "Aggregate",
      networkFabricId:
        "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourcegroups/example-rg/providers/Microsoft.ManagedNetworkFabric/networkFabrics/example-networkFabric",
    },
    tags: { keyId: "keyValue" },
    location: "eastuseuap",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await networkRacksCreateMaximumSetGen();
}

main().catch(console.error);
