// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create image from part of a dataset.
 *
 * @summary create image from part of a dataset.
 */
const { DefaultAzureCredential } = require("@azure/identity");
const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");

async function main() {
  const credential = new DefaultAzureCredential();
  const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "<your-geocatalog-endpoint>";
  const collectionId = process.env.PLANETARYCOMPUTER_COLLECTION_ID || "naip";
  const itemId = process.env.PLANETARYCOMPUTER_ITEM_ID || "ga_m_3308421_se_16_060_20211114";
  const client = new PlanetaryComputerProClient(endpoint, credential);

  const result = await client.data.getItemBboxCrop(
    collectionId,
    itemId,
    -84.393,
    33.6798,
    -84.367,
    33.7058,
    "png",
    {
      assets: ["image"],
      assetBandIndices: ["image|1,2,3"],
    },
  );
  console.log(result);
}

main().catch(console.error);
