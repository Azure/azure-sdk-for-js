// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified Fabric.
 *
 * @summary deletes the specified Fabric.
 * x-ms-original-file: 2026-01-15-preview/Fabrics_Delete.json
 */
async function fabricsDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  await client.fabrics.delete("example-rg", "example-fabric");
}

async function main(): Promise<void> {
  await fabricsDeleteMaximumSetGen();
}

main().catch(console.error);
