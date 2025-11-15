// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get an ingestion source in a geo-catalog
 *
 * @summary get an ingestion source in a geo-catalog
 * x-ms-original-file: 2025-04-30-preview/IngestionSources_Get.json
 */
async function ingestionSourcesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.ingestion.getSource(
    "00000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await ingestionSourcesGet();
}

main().catch(console.error);
