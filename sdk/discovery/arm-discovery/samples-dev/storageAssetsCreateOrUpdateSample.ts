// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a StorageAsset
 *
 * @summary create a StorageAsset
 * x-ms-original-file: 2026-02-01-preview/StorageAssets_CreateOrUpdate_MaximumSet_Gen.json
 */
async function storageAssetsCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.storageAssets.createOrUpdate(
    "rgdiscovery",
    "106b8981ac9ca95890",
    "8fd30c31448f7b0f1a",
    {
      properties: { description: "gwlk", path: "qmvrklgqdif" },
      tags: { key5443: "dneh" },
      location: "uksouth",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await storageAssetsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
