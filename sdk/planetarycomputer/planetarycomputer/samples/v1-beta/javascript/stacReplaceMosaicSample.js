// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a mosaic definition from a given collection
 *
 * @summary update a mosaic definition from a given collection
 * x-ms-original-file: 2025-04-30-preview/StacCollectionMosaics_Replace.json
 */
async function stacCollectionMosaicsReplace() {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.stac.replaceMosaic("naip-atl", "test-mosaic-1", {
    id: "test-mosaic-1",
    name: "Test Most recent available",
    description: "Most recent available imagery in this collection - updated",
    cql: [],
  });
  console.log(result);
}

async function main() {
  await stacCollectionMosaicsReplace();
}

main().catch(console.error);
