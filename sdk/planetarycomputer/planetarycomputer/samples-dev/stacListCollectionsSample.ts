// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all collections in the GeoCatalog instance
 *
 * @summary list all collections in the GeoCatalog instance
 * x-ms-original-file: 2025-04-30-preview/StacCollections_GetAll.json
 */
async function stacCollectionsGetAll(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.stac.listCollections();
  console.log(result);
}

async function main(): Promise<void> {
  await stacCollectionsGetAll();
}

main().catch(console.error);
