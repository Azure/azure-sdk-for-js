// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get operations of a geo-catalog collection
 *
 * @summary get operations of a geo-catalog collection
 * x-ms-original-file: 2025-04-30-preview/IngestionOperations_List.json
 */
async function ingestionOperationsList() {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const resArray = new Array();
  for await (const item of client.ingestion.listOperations()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await ingestionOperationsList();
}

main().catch(console.error);
