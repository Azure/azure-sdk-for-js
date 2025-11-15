// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to return Matrix Definition
 *
 * @summary return Matrix Definition
 * x-ms-original-file: 2025-04-30-preview/TileMatrixDefinitions_Get.json
 */
async function tileMatrixDefinitionsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.data.getTileMatrixDefinitions("WebMercatorQuad");
  console.log(result);
}

async function main(): Promise<void> {
  await tileMatrixDefinitionsGet();
}

main().catch(console.error);
