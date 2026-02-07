// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all managed identities with access to storage accounts configured for a geo-catalog
 *
 * @summary get all managed identities with access to storage accounts configured for a geo-catalog
 * x-ms-original-file: 2025-04-30-preview/IngestionSources_ListManagedIdentities.json
 */
async function ingestionSourcesListManagedIdentities() {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const resArray = new Array();
  for await (const item of client.ingestion.listManagedIdentities()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await ingestionSourcesListManagedIdentities();
}

main().catch(console.error);
