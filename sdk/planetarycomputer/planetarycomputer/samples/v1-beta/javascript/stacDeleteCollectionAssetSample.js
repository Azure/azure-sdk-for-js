// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a collection asset.
 *
 * @summary delete a collection asset.
 */
const { DefaultAzureCredential } = require("@azure/identity");
const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");

async function main() {
  const credential = new DefaultAzureCredential();
  const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "<your-geocatalog-endpoint>";
  const collectionId = process.env.PLANETARYCOMPUTER_COLLECTION_ID || "naip";
  const client = new PlanetaryComputerProClient(endpoint, credential);

  const result = await client.stac.deleteCollectionAsset(collectionId, "my-asset");
  console.log(result);
}

main().catch(console.error);
