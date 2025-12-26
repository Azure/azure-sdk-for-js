// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to generate a legend image for a given colormap.
 *
 * If the colormap has non-contiguous values at the beginning or end,
 * which aren't desired in the output image, they can be trimmed by specifying
 * the number of values to trim.
 *
 * @summary generate a legend image for a given colormap.
 *
 * If the colormap has non-contiguous values at the beginning or end,
 * which aren't desired in the output image, they can be trimmed by specifying
 * the number of values to trim.
 * x-ms-original-file: 2025-04-30-preview/MapsLegends_Get.json
 */
async function mapsLegendsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.data.getLegend("rdylgn");
  console.log(result);
}

async function main(): Promise<void> {
  await mapsLegendsGet();
}

main().catch(console.error);
