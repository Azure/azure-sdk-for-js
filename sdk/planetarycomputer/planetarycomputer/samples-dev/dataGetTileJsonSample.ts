// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to return the TileJson Tilematrixsetid As a path
 *
 * @summary return the TileJson Tilematrixsetid As a path
 * x-ms-original-file: 2025-04-30-preview/TilerTileJsonTileMatrixSets_Get.json
 */
async function tilerTileJsonTileMatrixSetsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.data.getTileJson(
    "naip-atl",
    "ga_m_3308421_se_16_060_20211114",
    "WebMercatorQuad",
    {
      assets: ["image"],
      assetBandIndices: "image|1,2,3",
      tileFormat: "png",
      tileScale: 1,
      minZoom: 7,
      maxZoom: 14,
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await tilerTileJsonTileMatrixSetsGet();
}

main().catch(console.error);
