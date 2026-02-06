// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a render option for a given collection
 *
 * @summary delete a render option for a given collection
 * x-ms-original-file: 2025-04-30-preview/StacCollectionRenderOptions_Delete.json
 */
async function stacCollectionRenderOptionsDelete() {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  await client.stac.deleteRenderOption("naip-atl", "test-natural-color");
}

async function main() {
  await stacCollectionRenderOptionsDelete();
}

main().catch(console.error);
