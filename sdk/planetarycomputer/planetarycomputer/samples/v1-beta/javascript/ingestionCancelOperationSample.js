// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cancel a running operation of a geo-catalog collection
 *
 * @summary cancel a running operation of a geo-catalog collection
 * x-ms-original-file: 2025-04-30-preview/IngestionOperations_Delete.json
 */
async function ingestionOperationsDelete() {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  await client.ingestion.cancelOperation("00000000-0000-0000-0000-000000000000");
}

async function main() {
  await ingestionOperationsDelete();
}

main().catch(console.error);
