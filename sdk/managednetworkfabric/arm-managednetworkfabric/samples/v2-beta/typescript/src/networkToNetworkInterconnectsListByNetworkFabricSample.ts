// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to implements Network To Network Interconnects list by Network Fabric GET method.
 *
 * @summary implements Network To Network Interconnects list by Network Fabric GET method.
 * x-ms-original-file: 2024-06-15-preview/NetworkToNetworkInterconnects_ListByNetworkFabric.json
 */
async function networkToNetworkInterconnectsListByNetworkFabricMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkToNetworkInterconnects.listByNetworkFabric(
    "example-rg",
    "example-nf",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await networkToNetworkInterconnectsListByNetworkFabricMaximumSetGen();
}

main().catch(console.error);
