// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a mosaic definition from a given collection
 *
 * @summary delete a mosaic definition from a given collection
 * x-ms-original-file: 2025-04-30-preview/StacCollectionMosaics_Delete.json
 */
async function stacCollectionMosaicsDelete() {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  await client.stac.deleteMosaic("naip-atl", "test-mosaic-1");
}

async function main() {
  await stacCollectionMosaicsDelete();
}

main().catch(console.error);
