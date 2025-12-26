// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to generate values and color swatches mapping for a given interval classmap.
 *
 * @summary generate values and color swatches mapping for a given interval classmap.
 * x-ms-original-file: 2025-04-30-preview/MapsIntervalLegends_GetByClassMapName.json
 */
async function mapsIntervalLegendsGetByClassMapName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.data.getIntervalLegend("modis-64A1");
  console.log(result);
}

async function main(): Promise<void> {
  await mapsIntervalLegendsGetByClassMapName();
}

main().catch(console.error);
