// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to return Matrix List
 *
 * @summary return Matrix List
 * x-ms-original-file: 2025-04-30-preview/TileMatrixList_Get.json
 */
async function tileMatrixListGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.data.listTileMatrices();
  console.log(result);
}

async function main(): Promise<void> {
  await tileMatrixListGet();
}

main().catch(console.error);
