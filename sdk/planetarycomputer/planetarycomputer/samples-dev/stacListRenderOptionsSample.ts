// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get all render options for a given collection
 *
 * @summary get all render options for a given collection
 * x-ms-original-file: 2025-04-30-preview/StacCollectionRenderOptions_GetAll.json
 */
async function stacCollectionRenderOptionsGetAll(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.stac.listRenderOptions("naip-atl");
  console.log(result);
}

async function main(): Promise<void> {
  await stacCollectionRenderOptionsGetAll();
}

main().catch(console.error);
