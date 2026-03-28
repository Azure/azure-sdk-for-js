// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to generate values and color swatches mapping for a given classmap.
 *
 * @summary generate values and color swatches mapping for a given classmap.
 * x-ms-original-file: 2025-04-30-preview/MapsClassMapLegends_Get.json
 */
async function mapsClassMapLegendsGet() {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.data.getClassMapLegend("mtbs-severity");
  console.log(result);
}

async function main() {
  await mapsClassMapLegendsGet();
}

main().catch(console.error);
