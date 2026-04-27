// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all queryables in a given collection
 *
 * @summary list all queryables in a given collection
 * x-ms-original-file: 2025-04-30-preview/StacQueryables_GetAllByCollection.json
 */
async function stacQueryablesGetAllByCollection() {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.stac.getCollectionQueryables("naip-atl");
  console.log(result);
}

async function main() {
  await stacQueryablesGetAllByCollection();
}

main().catch(console.error);
