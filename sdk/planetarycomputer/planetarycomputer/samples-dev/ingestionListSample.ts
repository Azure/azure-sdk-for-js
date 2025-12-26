// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get ingestions of a catalog
 *
 * @summary get ingestions of a catalog
 * x-ms-original-file: 2025-04-30-preview/Ingestions_List.json
 */
async function ingestionsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const resArray = new Array();
  for await (const item of client.ingestion.list("naip-atl")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await ingestionsList();
}

main().catch(console.error);
