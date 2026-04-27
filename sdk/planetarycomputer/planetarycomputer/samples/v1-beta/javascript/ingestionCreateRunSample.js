// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a new run of an ingestion
 *
 * @summary create a new run of an ingestion
 * x-ms-original-file: 2025-04-30-preview/IngestionRuns_Create.json
 */
async function ingestionRunsCreate() {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.ingestion.createRun(
    "naip-atl",
    "00000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

async function main() {
  await ingestionRunsCreate();
}

main().catch(console.error);
