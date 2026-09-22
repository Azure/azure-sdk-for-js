// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a mosaic map tile.
 *
 * @summary create a mosaic map tile.
 */
import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient } from "@azure/planetarycomputer";

async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "<your-geocatalog-endpoint>";
  const collectionId = process.env.PLANETARYCOMPUTER_COLLECTION_ID || "naip";
  const client = new PlanetaryComputerProClient(endpoint, credential);

  const result = await client.data.getSearchTileByScaleAndFormat(
    "ba13fc7947b9b585690d84ee61aaa653",
    "WebMercatorQuad",
    13,
    2174,
    3282,
    1,
    "png",
    {
      assets: ["image"],
      assetBandIndices: ["image|1,2,3"],
      collection: collectionId,
    },
  );
  console.log(result);
}

main().catch(console.error);
