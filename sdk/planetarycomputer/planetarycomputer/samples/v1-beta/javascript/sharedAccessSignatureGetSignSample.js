// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to sign a URL with a SAS token.
 *
 * @summary sign a URL with a SAS token.
 */
const { DefaultAzureCredential } = require("@azure/identity");
const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");

async function main() {
  const credential = new DefaultAzureCredential();
  const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "<your-geocatalog-endpoint>";
  const collectionId = process.env.PLANETARYCOMPUTER_COLLECTION_ID || "naip";
  const client = new PlanetaryComputerProClient(endpoint, credential);

  const collection = await client.stac.getCollection(collectionId);
  const href = collection.assets?.["thumbnail"]?.href || "https://example.com/asset";
  const result = await client.sharedAccessSignature.getUrl(href);
  console.log(result);
}

main().catch(console.error);
