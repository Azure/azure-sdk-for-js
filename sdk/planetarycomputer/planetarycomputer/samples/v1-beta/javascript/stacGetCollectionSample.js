// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a collection in the GeoCatalog instance
 *
 * @summary get a collection in the GeoCatalog instance
 * x-ms-original-file: 2025-04-30-preview/StacCollections_Get.json
 */
async function stacCollectionsGet() {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.stac.getCollection("naip-atl");
  console.log(result);
}

async function main() {
  await stacCollectionsGet();
}

main().catch(console.error);
