// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a StorageAsset
 *
 * @summary get a StorageAsset
 * x-ms-original-file: 2026-02-01-preview/StorageAssets_Get_MaximumSet_Gen.json
 */
async function storageAssetsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.storageAssets.get(
    "rgdiscovery",
    "edde0a4a016d7d6b2b",
    "5ea4bb40f40e2ef5e2",
  );
  console.log(result);
}

async function main() {
  await storageAssetsGetMaximumSet();
}

main().catch(console.error);
