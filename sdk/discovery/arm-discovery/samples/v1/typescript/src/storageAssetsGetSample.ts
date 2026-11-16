// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a StorageAsset
 *
 * @summary get a StorageAsset
 * x-ms-original-file: 2026-06-01/StorageAssets_Get_MaximumSet_Gen.json
 */
async function storageAssetsGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.storageAssets.get(
    "rgdiscovery",
    "880d16db0ce8a7a846",
    "c2e4ac21c9ead37737",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await storageAssetsGetMaximumSet();
}

main().catch(console.error);
