// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cancel all running operations of a geo-catalog collection
 *
 * @summary cancel all running operations of a geo-catalog collection
 * x-ms-original-file: 2025-04-30-preview/IngestionOperations_DeleteAll.json
 */
async function ingestionOperationsDeleteAll() {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  await client.ingestion.cancelAllOperations();
}

async function main() {
  await ingestionOperationsDeleteAll();
}

main().catch(console.error);
