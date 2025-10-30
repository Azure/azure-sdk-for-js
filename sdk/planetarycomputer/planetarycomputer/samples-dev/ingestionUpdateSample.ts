// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update an existing ingestion
 *
 * @summary update an existing ingestion
 * x-ms-original-file: 2025-04-30-preview/Ingestions_Update.json
 */
async function ingestionsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.ingestion.update(
    "naip-atl",
    "00000000-0000-0000-0000-000000000000",
    { importType: "StaticCatalog", displayName: "Updated Ingestion Name" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await ingestionsUpdate();
}

main().catch(console.error);
