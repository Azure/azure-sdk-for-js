// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to get a specific STAC item by collection
 * and item ID.
 *
 * @summary Get a STAC item.
 */
import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient } from "@azure/planetarycomputer";

async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "<your-geocatalog-endpoint>";
  const collectionId = process.env.PLANETARYCOMPUTER_COLLECTION_ID || "naip";
  const itemId = process.env.PLANETARYCOMPUTER_ITEM_ID || "ga_m_3308421_se_16_060_20211114";
  const client = new PlanetaryComputerProClient(endpoint, credential);

  const item = await client.stac.getItem(collectionId, itemId);
  console.log(`Item: ${item.id}`);
  console.log(`  Collection: ${item.collection}`);
  console.log(`  Geometry type: ${item.geometry?.type}`);
  console.log(`  Assets: ${Object.keys(item.assets).join(", ")}`);
}

main().catch(console.error);
