// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get Statistics from a geojson feature.
 *
 * @summary get Statistics from a geojson feature.
 * x-ms-original-file: 2025-04-30-preview/TilerGeoJsonStatistics_Get.json
 */
async function tilerGeoJsonStatisticsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.data.getGeoJsonStatistics(
    "naip-atl",
    "ga_m_3308421_se_16_060_20211114",
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
    { assets: ["image"] },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await tilerGeoJsonStatisticsGet();
}

main().catch(console.error);
