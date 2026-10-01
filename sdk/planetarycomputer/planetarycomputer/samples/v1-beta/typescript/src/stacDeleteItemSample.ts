// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a STAC item.
 *
 * @summary delete a STAC item.
 */
import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient } from "@azure/planetarycomputer";

async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "<your-geocatalog-endpoint>";
  const collectionId = process.env.PLANETARYCOMPUTER_COLLECTION_ID || "naip";
  const itemId = process.env.PLANETARYCOMPUTER_ITEM_ID || "ga_m_3308421_se_16_060_20211114";
  const client = new PlanetaryComputerProClient(endpoint, credential);

  const poller = client.stac.deleteItem(collectionId, itemId);
  await poller.pollUntilDone();
  console.log("Item deleted.");
}

main().catch(console.error);
