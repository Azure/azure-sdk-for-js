// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a StorageAsset
 *
 * @summary update a StorageAsset
 * x-ms-original-file: 2026-02-01-preview/StorageAssets_Update_MaximumSet_Gen.json
 */
async function storageAssetsUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.storageAssets.update(
    "rgdiscovery",
    "d177d30241e3f8a27d",
    "6cd8920c03970ccdfe",
    { properties: { description: "tljmqqr" }, tags: { key5822: "jicwkfdyoqvgpoy" } },
  );
  console.log(result);
}

async function main() {
  await storageAssetsUpdateMaximumSet();
}

main().catch(console.error);
