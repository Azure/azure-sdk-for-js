// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a mosaic definition from a given collection
 *
 * @summary delete a mosaic definition from a given collection
 * x-ms-original-file: 2025-04-30-preview/StacCollectionMosaics_Delete.json
 */
async function stacCollectionMosaicsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  await client.stac.deleteMosaic("naip-atl", "test-mosaic-1");
}

async function main(): Promise<void> {
  await stacCollectionMosaicsDelete();
}

main().catch(console.error);
