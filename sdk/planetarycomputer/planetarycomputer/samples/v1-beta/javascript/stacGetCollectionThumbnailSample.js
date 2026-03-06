// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get thumbnail for given collection.
 *
 * @summary get thumbnail for given collection.
 * x-ms-original-file: 2025-04-30-preview/StacCollectionThumbnails_Get.json
 */
async function stacCollectionThumbnailsGet() {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.stac.getCollectionThumbnail("naip-atl");
  console.log(result);
}

async function main() {
  await stacCollectionThumbnailsGet();
}

main().catch(console.error);
