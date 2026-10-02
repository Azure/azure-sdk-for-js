// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list StorageAsset resources by StorageContainer
 *
 * @summary list StorageAsset resources by StorageContainer
 * x-ms-original-file: 2026-06-01/StorageAssets_ListByStorageContainer_MaximumSet_Gen.json
 */
async function storageAssetsListByStorageContainerMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.storageAssets.listByStorageContainer(
    "rgdiscovery",
    "78d6139ad7238f844f",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await storageAssetsListByStorageContainerMaximumSet();
}

main().catch(console.error);
