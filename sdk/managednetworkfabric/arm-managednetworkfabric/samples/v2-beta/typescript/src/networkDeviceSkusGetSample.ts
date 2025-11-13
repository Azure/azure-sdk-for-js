// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Network Device SKU details.
 *
 * @summary get a Network Device SKU details.
 * x-ms-original-file: 2024-06-15-preview/NetworkDeviceSkus_Get.json
 */
async function networkDeviceSkusGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkDeviceSkus.get("example-deviceSku");
  console.log(result);
}

async function main(): Promise<void> {
  await networkDeviceSkusGetMaximumSetGen();
}

main().catch(console.error);
