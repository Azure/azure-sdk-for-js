// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get ingestion sources in a geo-catalog
 *
 * @summary get ingestion sources in a geo-catalog
 * x-ms-original-file: 2025-04-30-preview/IngestionSources_List.json
 */
async function ingestionSourcesList() {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const resArray = new Array();
  for await (const item of client.ingestion.listSources()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await ingestionSourcesList();
}

main().catch(console.error);
