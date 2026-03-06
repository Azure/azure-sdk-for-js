// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete an ingestion source from a geo-catalog
 *
 * @summary delete an ingestion source from a geo-catalog
 * x-ms-original-file: 2025-04-30-preview/IngestionSources_Delete.json
 */
async function ingestionSourcesDelete() {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  await client.ingestion.deleteSource("00000000-0000-0000-0000-000000000000");
}

async function main() {
  await ingestionSourcesDelete();
}

main().catch(console.error);
