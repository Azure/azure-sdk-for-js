// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete an ingestion from a catalog. All runs of the ingestion will be deleted. Ingestion must not have any runs in progress or queued.
 *
 * @summary delete an ingestion from a catalog. All runs of the ingestion will be deleted. Ingestion must not have any runs in progress or queued.
 * x-ms-original-file: 2025-04-30-preview/Ingestions_Delete.json
 */
async function ingestionsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  await client.ingestion.delete(
    "naip-atl",
    "00000000-0000-0000-0000-000000000000",
  );
}

async function main(): Promise<void> {
  await ingestionsDelete();
}

main().catch(console.error);
