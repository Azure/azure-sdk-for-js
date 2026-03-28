// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to return Matrix List
 *
 * @summary return Matrix List
 * x-ms-original-file: 2025-04-30-preview/TileMatrixList_Get.json
 */
async function tileMatrixListGet() {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.data.listTileMatrices();
  console.log(result);
}

async function main() {
  await tileMatrixListGet();
}

main().catch(console.error);
