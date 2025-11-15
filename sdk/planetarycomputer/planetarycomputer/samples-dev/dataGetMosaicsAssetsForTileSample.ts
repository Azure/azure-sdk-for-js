// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to return a list of assets which overlap a given tile
 *
 * @summary return a list of assets which overlap a given tile
 * x-ms-original-file: 2025-04-30-preview/MosaicsAssetsForTileMatrixSets_GetZxyAssets.json
 */
async function mosaicsAssetsForTileMatrixSetsGetZxyAssets(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.data.getMosaicsAssetsForTile(
    "ba13fc7947b9b585690d84ee61aaa653",
    "WebMercatorQuad",
    "naip-atl",
    13,
    2174,
    3282,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await mosaicsAssetsForTileMatrixSetsGetZxyAssets();
}

main().catch(console.error);
