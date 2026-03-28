// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update an existing asset in a given collection.
 *
 * @summary update an existing asset in a given collection.
 * x-ms-original-file: 2025-04-30-preview/StacCollectionAssets_Replace.json
 */
async function stacCollectionAssetsReplace() {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.stac.replaceCollectionAsset("naip-atl", "test-asset");
  console.log(result);
}

async function main() {
  await stacCollectionAssetsReplace();
}

main().catch(console.error);
