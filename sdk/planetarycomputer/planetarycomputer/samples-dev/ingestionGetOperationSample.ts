// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get an operation of a geo-catalog collection
 *
 * @summary get an operation of a geo-catalog collection
 * x-ms-original-file: 2025-04-30-preview/IngestionOperations_Get.json
 */
async function ingestionOperationsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.ingestion.getOperation(
    "00000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await ingestionOperationsGet();
}

main().catch(console.error);
