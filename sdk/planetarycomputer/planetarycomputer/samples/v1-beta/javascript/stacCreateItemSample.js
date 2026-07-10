// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a STAC item.
 *
 * @summary create a STAC item.
 */
const { DefaultAzureCredential } = require("@azure/identity");
const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");

async function main() {
  const credential = new DefaultAzureCredential();
  const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "<your-geocatalog-endpoint>";
  const collectionId = process.env.PLANETARYCOMPUTER_COLLECTION_ID || "naip";
  const client = new PlanetaryComputerProClient(endpoint, credential);

  const poller = client.stac.createItem(collectionId, {
    id: "my-item",
    type: "Feature",
    stacVersion: "1.0.0",
    geometry: { type: "Point", coordinates: [-84.39, 33.67] },
    properties: { datetime: "2024-01-01T00:00:00Z" },
    assets: {},
    links: [],
    collection: collectionId,
  });
  await poller.pollUntilDone();
  console.log("Item created.");
}

main().catch(console.error);
