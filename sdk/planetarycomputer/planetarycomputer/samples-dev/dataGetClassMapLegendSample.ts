// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to generate values and color swatches mapping for a given classmap.
 *
 * @summary generate values and color swatches mapping for a given classmap.
 * x-ms-original-file: 2025-04-30-preview/MapsClassMapLegends_Get.json
 */
async function mapsClassMapLegendsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.data.getClassMapLegend("mtbs-severity");
  console.log(result);
}

async function main(): Promise<void> {
  await mapsClassMapLegendsGet();
}

main().catch(console.error);
