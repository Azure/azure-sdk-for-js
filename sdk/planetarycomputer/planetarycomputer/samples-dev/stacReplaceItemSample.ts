// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to replace a STAC item.
 *
 * @summary replace a STAC item.
 */
import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient } from "@azure/planetarycomputer";

async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "<your-geocatalog-endpoint>";
  const collectionId = process.env.PLANETARYCOMPUTER_COLLECTION_ID || "naip";
  const itemId = process.env.PLANETARYCOMPUTER_ITEM_ID || "ga_m_3308421_se_16_060_20211114";
  const client = new PlanetaryComputerProClient(endpoint, credential);

  const poller = client.stac.replaceItem(collectionId, itemId, {
    id: itemId,
    type: "Feature",
    stacVersion: "1.0.0",
    geometry: { type: "Point", coordinates: [-84.39, 33.67] },
    properties: { datetime: "2024-01-01T00:00:00Z" },
    assets: {},
    links: [],
    collection: collectionId,
  });
  await poller.pollUntilDone();
  console.log("Item replaced.");
}

main().catch(console.error);
