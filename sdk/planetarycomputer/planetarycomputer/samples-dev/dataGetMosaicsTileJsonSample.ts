// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to return TileJSON document for a searchId.
 *
 * @summary return TileJSON document for a searchId.
 * x-ms-original-file: 2025-04-30-preview/MosaicsTileMatrixSetsTileJson_Get.json
 */
async function mosaicsTileMatrixSetsTileJsonGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.data.getMosaicsTileJson(
    "ba13fc7947b9b585690d84ee61aaa653",
    "WebMercatorQuad",
    {
      assets: ["image"],
      assetBandIndices: "image|1,2,3",
      minZoom: 9,
      tileFormat: "png",
      tileScale: 1,
      collection: "naip-atl",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await mosaicsTileMatrixSetsTileJsonGet();
}

main().catch(console.error);
