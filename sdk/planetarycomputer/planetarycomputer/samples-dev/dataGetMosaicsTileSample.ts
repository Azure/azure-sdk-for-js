// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create map tile.
 *
 * @summary create map tile.
 * x-ms-original-file: 2025-04-30-preview/MosaicsTileMatrixSets_GetZxyScaleByFormat.json
 */
async function mosaicsTileMatrixSetsGetZxyScaleByFormat(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.data.getMosaicsTile(
    "ba13fc7947b9b585690d84ee61aaa653",
    "WebMercatorQuad",
    13,
    2174,
    3282,
    1,
    "png",
    {
      assets: ["image"],
      assetBandIndices: "image|1,2,3",
      collection: "naip-atl",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await mosaicsTileMatrixSetsGetZxyScaleByFormat();
}

main().catch(console.error);
