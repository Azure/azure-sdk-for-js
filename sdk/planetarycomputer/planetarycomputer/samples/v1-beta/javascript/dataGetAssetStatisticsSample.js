// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to get per-asset statistics.
 *
 * @summary get per-asset statistics.
 */
const { DefaultAzureCredential } = require("@azure/identity");
const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");

async function main() {
  const credential = new DefaultAzureCredential();
  const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "<your-geocatalog-endpoint>";
  const collectionId = process.env.PLANETARYCOMPUTER_COLLECTION_ID || "naip";
  const itemId = process.env.PLANETARYCOMPUTER_ITEM_ID || "ga_m_3308421_se_16_060_20211114";
  const client = new PlanetaryComputerProClient(endpoint, credential);

  const result = await client.data.getItemAssetStatistics(collectionId, itemId, {
    assets: ["image"],
  });
  console.log(result);
}

main().catch(console.error);
