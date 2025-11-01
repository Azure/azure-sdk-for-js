// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete an ingestion source from a geo-catalog
 *
 * @summary delete an ingestion source from a geo-catalog
 * x-ms-original-file: 2025-04-30-preview/IngestionSources_Delete.json
 */
async function ingestionSourcesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  await client.ingestion.deleteSource("00000000-0000-0000-0000-000000000000");
}

async function main(): Promise<void> {
  await ingestionSourcesDelete();
}

main().catch(console.error);
