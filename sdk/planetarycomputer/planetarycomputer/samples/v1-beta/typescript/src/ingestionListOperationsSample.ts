// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to list operations.
 *
 * @summary list operations.
 */
import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient } from "@azure/planetarycomputer";

async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "<your-geocatalog-endpoint>";
  const client = new PlanetaryComputerProClient(endpoint, credential);

  const resArray = [];
  for await (const item of client.ingestion.listOperations()) {
    resArray.push(item);
  }
  console.log(resArray);
}

main().catch(console.error);
