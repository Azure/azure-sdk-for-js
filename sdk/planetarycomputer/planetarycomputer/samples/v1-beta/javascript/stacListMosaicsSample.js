// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the mosaic definitions for a given collection
 *
 * @summary get the mosaic definitions for a given collection
 * x-ms-original-file: 2025-04-30-preview/StacCollectionMosaics_GetAll.json
 */
async function stacCollectionMosaicsGetAll() {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.stac.listMosaics("naip-atl");
  console.log(result);
}

async function main() {
  await stacCollectionMosaicsGetAll();
}

main().catch(console.error);
