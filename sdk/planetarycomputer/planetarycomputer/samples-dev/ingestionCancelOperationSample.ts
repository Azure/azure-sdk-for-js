// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to cancel a running operation of a geo-catalog collection
 *
 * @summary cancel a running operation of a geo-catalog collection
 * x-ms-original-file: 2025-04-30-preview/IngestionOperations_Delete.json
 */
async function ingestionOperationsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  await client.ingestion.cancelOperation(
    "00000000-0000-0000-0000-000000000000",
  );
}

async function main(): Promise<void> {
  await ingestionOperationsDelete();
}

main().catch(console.error);
