// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all queryables in the GeoCatalog instance
 *
 * @summary list all queryables in the GeoCatalog instance
 * x-ms-original-file: 2025-04-30-preview/StacQueryables_GetAll.json
 */
async function stacQueryablesGetAll() {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.stac.listQueryables();
  console.log(result);
}

async function main() {
  await stacQueryablesGetAll();
}

main().catch(console.error);
