// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the tile settings for a given collection
 *
 * @summary get the tile settings for a given collection
 * x-ms-original-file: 2025-04-30-preview/StacCollectionTileSettings_Get.json
 */
async function stacCollectionTileSettingsGet() {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.stac.getTileSettings("naip-atl");
  console.log(result);
}

async function main() {
  await stacCollectionTileSettingsGet();
}

main().catch(console.error);
