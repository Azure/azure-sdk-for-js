// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified Fabric.
 *
 * @summary gets the specified Fabric.
 * x-ms-original-file: 2026-01-15-preview/Fabrics_Get.json
 */
async function fabricsGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.fabrics.get("example-rg", "example-fabric");
  console.log(result);
}

async function main(): Promise<void> {
  await fabricsGetMaximumSetGen();
}

main().catch(console.error);
