// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a StorageAsset
 *
 * @summary delete a StorageAsset
 * x-ms-original-file: 2026-02-01-preview/StorageAssets_Delete_MaximumSet_Gen.json
 */
async function storageAssetsDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  await client.storageAssets.delete("rgdiscovery", "f7e7a03c675ccffe1a", "8f741ee4588dc823fc");
}

async function main() {
  await storageAssetsDeleteMaximumSet();
}

main().catch(console.error);
