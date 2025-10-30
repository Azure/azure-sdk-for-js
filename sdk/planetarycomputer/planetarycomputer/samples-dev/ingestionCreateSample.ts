// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a new ingestion
 *
 * @summary create a new ingestion
 * x-ms-original-file: 2025-04-30-preview/Ingestions_Create.json
 */
async function ingestionsCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.ingestion.create("naip-atl", {
    importType: "StaticCatalog",
    displayName: "Ingestion",
    sourceCatalogUrl:
      "https://raw.githubusercontent.com/aloverro/mpcpro-sample-datasets/main/datasets/planetary_computer/naip/catalog.json",
    keepOriginalAssets: true,
    skipExistingItems: true,
  });
  console.log(result);
}

async function main(): Promise<void> {
  await ingestionsCreate();
}

main().catch(console.error);
