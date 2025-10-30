// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create map tile from a dataset.
 *
 * @summary create map tile from a dataset.
 * x-ms-original-file: 2025-04-30-preview/TilerTileMatrixSets_GetZxyScaleByFormat.json
 */
async function tilerTileMatrixSetsGetZxyScaleByFormat(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.data.getTile(
    "naip-atl",
    "ga_m_3308421_se_16_060_20211114",
    "WebMercatorQuad",
    14,
    4349,
    6564,
    1,
    "png",
    { assets: ["image"], assetBandIndices: "image|1,2,3" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await tilerTileMatrixSetsGetZxyScaleByFormat();
}

main().catch(console.error);
