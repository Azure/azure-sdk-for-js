// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a StorageAsset
 *
 * @summary delete a StorageAsset
 * x-ms-original-file: 2026-06-01/StorageAssets_Delete_MaximumSet_Gen.json
 */
async function storageAssetsDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  await client.storageAssets.delete("rgdiscovery", "86f9743316a64d577a", "7255aed4c052c5a165");
}

async function main(): Promise<void> {
  await storageAssetsDeleteMaximumSet();
}

main().catch(console.error);
