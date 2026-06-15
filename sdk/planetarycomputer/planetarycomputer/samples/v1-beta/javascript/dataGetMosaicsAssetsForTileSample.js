// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to get mosaic assets for a tile.
 *
 * @summary get mosaic assets for a tile.
 */
const { DefaultAzureCredential } = require("@azure/identity");
const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");

async function main() {
  const credential = new DefaultAzureCredential();
  const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "<your-geocatalog-endpoint>";
  const collectionId = process.env.PLANETARYCOMPUTER_COLLECTION_ID || "naip";
  const client = new PlanetaryComputerProClient(endpoint, credential);

  const result = await client.data.getSearchAssetsForTile(
    "ba13fc7947b9b585690d84ee61aaa653",
    "WebMercatorQuad",
    collectionId,
    13,
    2174,
    3282,
  );
  console.log(result);
}

main().catch(console.error);
