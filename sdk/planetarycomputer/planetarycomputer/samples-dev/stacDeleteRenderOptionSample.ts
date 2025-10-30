// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a render option for a given collection
 *
 * @summary delete a render option for a given collection
 * x-ms-original-file: 2025-04-30-preview/StacCollectionRenderOptions_Delete.json
 */
async function stacCollectionRenderOptionsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  await client.stac.deleteRenderOption("naip-atl", "test-natural-color");
}

async function main(): Promise<void> {
  await stacCollectionRenderOptionsDelete();
}

main().catch(console.error);
