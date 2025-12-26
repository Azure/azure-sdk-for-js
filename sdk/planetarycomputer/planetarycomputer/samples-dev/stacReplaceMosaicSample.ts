// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a mosaic definition from a given collection
 *
 * @summary update a mosaic definition from a given collection
 * x-ms-original-file: 2025-04-30-preview/StacCollectionMosaics_Replace.json
 */
async function stacCollectionMosaicsReplace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.stac.replaceMosaic("naip-atl", "test-mosaic-1", {
    id: "test-mosaic-1",
    name: "Test Most recent available",
    description: "Most recent available imagery in this collection - updated",
    cql: [],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await stacCollectionMosaicsReplace();
}

main().catch(console.error);
