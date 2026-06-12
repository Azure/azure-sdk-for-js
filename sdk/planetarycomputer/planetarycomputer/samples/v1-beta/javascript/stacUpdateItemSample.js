// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to update a STAC item.
 *
 * @summary update a STAC item.
 */
const { DefaultAzureCredential } = require("@azure/identity");
const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");

async function main() {
  const credential = new DefaultAzureCredential();
  const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "<your-geocatalog-endpoint>";
  const collectionId = process.env.PLANETARYCOMPUTER_COLLECTION_ID || "naip";
  const itemId = process.env.PLANETARYCOMPUTER_ITEM_ID || "ga_m_3308421_se_16_060_20211114";
  const client = new PlanetaryComputerProClient(endpoint, credential);

  const item = await client.stac.getItem(collectionId, itemId);
  const poller = client.stac.updateItem(collectionId, itemId, {
    ...item,
    properties: { ...item.properties, platform: "Updated" },
  });
  await poller.pollUntilDone();
  console.log("Item updated.");
}

main().catch(console.error);
