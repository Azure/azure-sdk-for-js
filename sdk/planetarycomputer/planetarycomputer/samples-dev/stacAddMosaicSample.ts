// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to add a mosaic definition to a given collection
 *
 * @summary add a mosaic definition to a given collection
 * x-ms-original-file: 2025-04-30-preview/StacCollectionMosaics_Add.json
 */
async function stacCollectionMosaicsAdd(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.stac.addMosaic("naip-atl", {
    id: "test-mosaic-1",
    name: "Test Most recent available",
    cql: [],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await stacCollectionMosaicsAdd();
}

main().catch(console.error);
