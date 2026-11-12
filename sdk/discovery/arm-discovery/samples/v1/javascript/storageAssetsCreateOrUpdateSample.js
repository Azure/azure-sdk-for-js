// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a StorageAsset
 *
 * @summary create a StorageAsset
 * x-ms-original-file: 2026-06-01/StorageAssets_CreateOrUpdate_MaximumSet_Gen.json
 */
async function storageAssetsCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.storageAssets.createOrUpdate(
    "rgdiscovery",
    "d676b22945d9bc1c78",
    "ccc236f0a64cea48ae",
    {
      properties: { description: "nopjazrozjrjeruobmiwm", path: "oakrihezlavfyobbhmgqmzowzw" },
      tags: { key5959: "oougwvhtjmly" },
      location: "uksouth",
    },
  );
  console.log(result);
}

async function main() {
  await storageAssetsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
