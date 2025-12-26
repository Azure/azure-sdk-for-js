// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a collection in the GeoCatalog instance
 *
 * @summary delete a collection in the GeoCatalog instance
 * x-ms-original-file: 2025-04-30-preview/StacCollections_Delete.json
 */
async function stacCollectionsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  await client.stac.deleteCollection("test-partition-type-collection");
}

async function main(): Promise<void> {
  await stacCollectionsDelete();
}

main().catch(console.error);
