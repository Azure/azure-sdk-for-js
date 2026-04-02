// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get Network Fabric resource details.
 *
 * @summary get Network Fabric resource details.
 * x-ms-original-file: 2025-07-15/NetworkFabrics_Get.json
 */
async function networkFabricsGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkFabrics.get("example-rg", "example-fabric");
  console.log(result);
}

async function main(): Promise<void> {
  await networkFabricsGetMaximumSetGen();
}

main().catch(console.error);
