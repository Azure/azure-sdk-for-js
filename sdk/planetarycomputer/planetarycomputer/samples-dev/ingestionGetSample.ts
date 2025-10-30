// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the definition of an ingestion
 *
 * @summary get the definition of an ingestion
 * x-ms-original-file: 2025-04-30-preview/Ingestions_Get.json
 */
async function ingestionsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.ingestion.get(
    "naip-atl",
    "00000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await ingestionsGet();
}

main().catch(console.error);
