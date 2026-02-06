// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a STAC item from a collection
 *
 * @summary delete a STAC item from a collection
 * x-ms-original-file: 2025-04-30-preview/StacItems_Delete.json
 */
async function stacItemsDelete() {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  await client.stac.deleteItem("naip-atl", "ga_m_3308421_se_16_060_20211114_delete_test");
}

async function main() {
  await stacItemsDelete();
}

main().catch(console.error);
