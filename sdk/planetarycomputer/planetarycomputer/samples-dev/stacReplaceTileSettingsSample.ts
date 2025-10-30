// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the tile settings for a given collection
 *
 * @summary update the tile settings for a given collection
 * x-ms-original-file: 2025-04-30-preview/StacCollectionTileSettings_Replace.json
 */
async function stacCollectionTileSettingsReplace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.stac.replaceTileSettings("naip-atl", {
    maxItemsPerTile: 35,
    minZoom: 6,
  });
  console.log(result);
}

async function main(): Promise<void> {
  await stacCollectionTileSettingsReplace();
}

main().catch(console.error);
