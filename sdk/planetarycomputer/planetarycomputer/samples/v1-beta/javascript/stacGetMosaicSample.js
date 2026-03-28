// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a mosaic definition from a given collection
 *
 * @summary get a mosaic definition from a given collection
 * x-ms-original-file: 2025-04-30-preview/StacCollectionMosaics_Get.json
 */
async function stacCollectionMosaicsGet() {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.stac.getMosaic("naip-atl", "test-mosaic-1");
  console.log(result);
}

async function main() {
  await stacCollectionMosaicsGet();
}

main().catch(console.error);
