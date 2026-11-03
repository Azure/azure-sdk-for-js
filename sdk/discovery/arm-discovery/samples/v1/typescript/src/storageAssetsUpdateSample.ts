// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a StorageAsset
 *
 * @summary update a StorageAsset
 * x-ms-original-file: 2026-06-01/StorageAssets_Update_MaximumSet_Gen.json
 */
async function storageAssetsUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.storageAssets.update(
    "rgdiscovery",
    "0d1a35c1a97ad3a5d9",
    "06a17210ad733943d1",
    {
      properties: { description: "hesvphxbjqrgbmdntuohbtmmllmqj" },
      tags: { key6257: "fspetaqmcldlgu" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await storageAssetsUpdateMaximumSet();
}

main().catch(console.error);
