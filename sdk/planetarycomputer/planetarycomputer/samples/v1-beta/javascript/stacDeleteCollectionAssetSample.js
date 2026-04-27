// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete an asset from a given collection.
 *
 * @summary delete an asset from a given collection.
 * x-ms-original-file: 2025-04-30-preview/StacCollectionAssets_Delete.json
 */
async function stacCollectionAssetsDelete() {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.stac.deleteCollectionAsset("naip-atl", "test-asset");
  console.log(result);
}

async function main() {
  await stacCollectionAssetsDelete();
}

main().catch(console.error);
