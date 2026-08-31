// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to update an ingestion definition.
 *
 * @summary update an ingestion definition.
 */
const { DefaultAzureCredential } = require("@azure/identity");
const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");

async function main() {
  const credential = new DefaultAzureCredential();
  const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "<your-geocatalog-endpoint>";
  const collectionId = process.env.PLANETARYCOMPUTER_COLLECTION_ID || "naip";
  const client = new PlanetaryComputerProClient(endpoint, credential);

  const result = await client.ingestion.update(
    collectionId,
    "00000000-0000-0000-0000-000000000000",
    {
      importType: "StaticCatalog",
      displayName: "Updated Ingestion",
      sourceCatalogUrl: "https://example.com/catalog.json",
      keepOriginalAssets: true,
      skipExistingItems: true,
    },
  );
  console.log(result);
}

main().catch(console.error);
