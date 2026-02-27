// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list StorageAsset resources by StorageContainer
 *
 * @summary list StorageAsset resources by StorageContainer
 * x-ms-original-file: 2026-02-01-preview/StorageAssets_ListByStorageContainer_MaximumSet_Gen.json
 */
async function storageAssetsListByStorageContainerMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.storageAssets.listByStorageContainer(
    "rgdiscovery",
    "6b4fbcbb65873f18bf",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await storageAssetsListByStorageContainerMaximumSet();
}

main().catch(console.error);
