// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to get mosaic TileJSON.
 *
 * @summary get mosaic TileJSON.
 */
import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient } from "@azure/planetarycomputer";

async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "<your-geocatalog-endpoint>";
  const collectionId = process.env.PLANETARYCOMPUTER_COLLECTION_ID || "naip";
  const client = new PlanetaryComputerProClient(endpoint, credential);

  const result = await client.data.getSearchTileJsonByTms(
    "ba13fc7947b9b585690d84ee61aaa653",
    "WebMercatorQuad",
    {
      assets: ["image"],
      assetBandIndices: ["image|1,2,3"],
      minZoom: 9,
      tileFormat: "png",
      tileScale: 1,
      collection: collectionId,
    },
  );
  console.log(result);
}

main().catch(console.error);
