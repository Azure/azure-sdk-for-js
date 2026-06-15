// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to implements the operation to the underlying resources.
 *
 * @summary implements the operation to the underlying resources.
 * x-ms-original-file: 2025-07-15/NetworkTaps_Resync.json
 */
async function networkTapsResyncMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkTaps.resync("example-rg", "example-networkTap");
  console.log(result);
}

async function main(): Promise<void> {
  await networkTapsResyncMaximumSetGen();
}

main().catch(console.error);
