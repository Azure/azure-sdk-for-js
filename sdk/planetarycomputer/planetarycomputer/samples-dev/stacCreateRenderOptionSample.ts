// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to add a render option for a given collection
 *
 * @summary add a render option for a given collection
 * x-ms-original-file: 2025-04-30-preview/StacCollectionRenderOptions_Create.json
 */
async function stacCollectionRenderOptionsCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.stac.createRenderOption("naip-atl", {
    id: "test-natural-color",
    name: "Test Natural color",
    type: "raster-tile",
    options: "assets=image&asset_bidx=image|1,2,3",
    minZoom: 6,
  });
  console.log(result);
}

async function main(): Promise<void> {
  await stacCollectionRenderOptionsCreate();
}

main().catch(console.error);
