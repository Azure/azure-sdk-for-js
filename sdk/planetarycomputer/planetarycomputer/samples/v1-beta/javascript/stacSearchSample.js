// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to search for STAC items using spatial
 * and temporal filters with CQL2-JSON.
 *
 * @summary Search for STAC items.
 */
const { DefaultAzureCredential } = require("@azure/identity");
const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");

async function main() {
  const credential = new DefaultAzureCredential();
  const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "<your-geocatalog-endpoint>";
  const collectionId = process.env.PLANETARYCOMPUTER_COLLECTION_ID || "naip";
  const client = new PlanetaryComputerProClient(endpoint, credential);

  const searchResult = await client.stac.search({
    collections: [collectionId],
    filterLang: "cql2-json",
    filter: {
      op: "s_intersects",
      args: [
        { property: "geometry" },
        {
          type: "Polygon",
          coordinates: [
            [
              [-84.464, 33.603],
              [-84.388, 33.603],
              [-84.388, 33.671],
              [-84.464, 33.671],
              [-84.464, 33.603],
            ],
          ],
        },
      ],
    },
    dateTime: "2021-01-01T00:00:00Z/2022-12-31T00:00:00Z",
    sortby: [{ field: "datetime", direction: "desc" }],
    limit: 10,
  });

  console.log(`Found ${searchResult.features.length} items:`);
  for (const item of searchResult.features) {
    console.log(`  - ${item.id} (collection: ${item.collection})`);
  }
}

main().catch(console.error);
