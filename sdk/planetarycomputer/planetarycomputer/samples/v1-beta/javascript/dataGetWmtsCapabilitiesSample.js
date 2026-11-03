// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to get OGC WMTS capabilities.
 *
 * @summary get OGC WMTS capabilities.
 */
const { DefaultAzureCredential } = require("@azure/identity");
const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");

async function main() {
  const credential = new DefaultAzureCredential();
  const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "<your-geocatalog-endpoint>";
  const collectionId = process.env.PLANETARYCOMPUTER_COLLECTION_ID || "naip";
  const itemId = process.env.PLANETARYCOMPUTER_ITEM_ID || "ga_m_3308421_se_16_060_20211114";
  const client = new PlanetaryComputerProClient(endpoint, credential);

  const result = await client.data.getItemWmtsCapabilitiesByTms(
    collectionId,
    itemId,
    "WebMercatorQuad",
    {
      tileFormat: "png",
      tileScale: 1,
      minZoom: 7,
      maxZoom: 14,
      assets: ["image"],
      assetBandIndices: ["image|1,2,3"],
    },
  );
  console.log(result);
}

main().catch(console.error);
