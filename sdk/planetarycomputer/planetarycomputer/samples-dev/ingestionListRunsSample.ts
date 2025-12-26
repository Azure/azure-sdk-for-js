// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the runs of an ingestion
 *
 * @summary get the runs of an ingestion
 * x-ms-original-file: 2025-04-30-preview/IngestionRuns_List.json
 */
async function ingestionRunsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const resArray = new Array();
  for await (const item of client.ingestion.listRuns(
    "naip-atl",
    "00000000-0000-0000-0000-000000000000",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await ingestionRunsList();
}

main().catch(console.error);
