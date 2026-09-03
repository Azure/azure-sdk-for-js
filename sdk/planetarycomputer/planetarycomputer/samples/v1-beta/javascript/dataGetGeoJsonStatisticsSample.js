// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to get statistics from a GeoJSON feature.
 *
 * @summary get statistics from a GeoJSON feature.
 */
const { DefaultAzureCredential } = require("@azure/identity");
const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");

async function main() {
  const credential = new DefaultAzureCredential();
  const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "<your-geocatalog-endpoint>";
  const collectionId = process.env.PLANETARYCOMPUTER_COLLECTION_ID || "naip";
  const itemId = process.env.PLANETARYCOMPUTER_ITEM_ID || "ga_m_3308421_se_16_060_20211114";
  const client = new PlanetaryComputerProClient(endpoint, credential);

  const result = await client.data.getItemFeatureStatistics(
    collectionId,
    itemId,
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-84.3906, 33.6714],
            [-84.3814, 33.6714],
            [-84.3814, 33.6806],
            [-84.3906, 33.6806],
            [-84.3906, 33.6714],
          ],
        ],
      },
      properties: {},
    },
    { assets: ["image"] },
  );
  console.log(result);
}

main().catch(console.error);
