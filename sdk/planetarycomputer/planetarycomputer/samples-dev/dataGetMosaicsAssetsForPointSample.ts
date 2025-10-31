// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to return a list of assets for a given point.
 *
 * @summary return a list of assets for a given point.
 * x-ms-original-file: 2025-04-30-preview/MosaicsAssetsForPoints_GetPointAssets.json
 */
async function mosaicsAssetsForPointsGetPointAssets(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.data.getMosaicsAssetsForPoint(
    "ba13fc7947b9b585690d84ee61aaa653",
    -84.43202751899601,
    33.63964763972227,
    {
      scanLimit: 100,
      itemsLimit: 100,
      timeLimit: 30,
      exitWhenFull: true,
      skipCovered: true,
      coordinateReferenceSystem: "EPSG:4326",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await mosaicsAssetsForPointsGetPointAssets();
}

main().catch(console.error);
