// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the tile settings for a given collection
 *
 * @summary update the tile settings for a given collection
 * x-ms-original-file: 2025-04-30-preview/StacCollectionTileSettings_Replace.json
 */
async function stacCollectionTileSettingsReplace() {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.stac.replaceTileSettings("naip-atl", {
    maxItemsPerTile: 35,
    minZoom: 6,
  });
  console.log(result);
}

async function main() {
  await stacCollectionTileSettingsReplace();
}

main().catch(console.error);
