// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create image from a geojson feature.
 *
 * @summary create image from a geojson feature.
 * x-ms-original-file: 2025-04-30-preview/TilerGeoJsons_CropWidthByHeightFormat.json
 */
async function tilerGeoJsonsCropWidthByHeightFormat(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.data.cropGeoJsonWithDimensions(
    "naip-atl",
    "ga_m_3308421_se_16_060_20211114",
    256,
    256,
    "png",
    {
      type: "Feature",
      geometry: {
        coordinates: [
          [
            [-84.3906, 33.6714],
            [-84.3814, 33.6714],
            [-84.3814, 33.6806],
            [-84.3906, 33.6806],
            [-84.3906, 33.6714],
          ],
        ],
        type: "Polygon",
      },
      properties: {},
    },
    { assets: ["image"], assetBandIndices: "image|1,2,3" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await tilerGeoJsonsCropWidthByHeightFormat();
}

main().catch(console.error);
