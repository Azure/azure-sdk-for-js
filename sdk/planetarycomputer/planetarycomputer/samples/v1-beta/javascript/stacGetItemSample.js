// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to fetch a single STAC Item
 *
 * @summary fetch a single STAC Item
 * x-ms-original-file: 2025-04-30-preview/StacItems_Get.json
 */
async function stacItemsGet() {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.stac.getItem("naip-atl", "ga_m_3308421_se_16_060_20211114_test");
  console.log(result);
}

async function main() {
  await stacItemsGet();
}

main().catch(console.error);
