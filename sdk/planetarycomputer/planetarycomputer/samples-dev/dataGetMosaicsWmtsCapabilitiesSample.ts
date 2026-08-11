// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to get mosaic OGC WMTS capabilities.
 *
 * @summary get mosaic OGC WMTS capabilities.
 */
import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient } from "@azure/planetarycomputer";

async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "<your-geocatalog-endpoint>";
  const client = new PlanetaryComputerProClient(endpoint, credential);

  const result = await client.data.getSearchWmtsCapabilitiesByTms(
    "ba13fc7947b9b585690d84ee61aaa653",
    "WebMercatorQuad",
    {
      tileFormat: "png",
      tileScale: 1,
      minZoom: 7,
      maxZoom: 13,
      assets: ["image"],
      assetBandIndices: ["image|1,2,3"],
    },
  );
  console.log(result);
}

main().catch(console.error);
