// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a new ingestion.
 *
 * @summary create a new ingestion.
 */
const { DefaultAzureCredential } = require("@azure/identity");
const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");

async function main() {
  const credential = new DefaultAzureCredential();
  const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "<your-geocatalog-endpoint>";
  const collectionId = process.env.PLANETARYCOMPUTER_COLLECTION_ID || "naip";
  const client = new PlanetaryComputerProClient(endpoint, credential);

  const result = await client.ingestion.create(collectionId, {
    importType: "StaticCatalog",
    displayName: "Ingestion",
    sourceCatalogUrl: "https://example.com/catalog.json",
    keepOriginalAssets: true,
    skipExistingItems: true,
  });
  console.log(result);
}

main().catch(console.error);
