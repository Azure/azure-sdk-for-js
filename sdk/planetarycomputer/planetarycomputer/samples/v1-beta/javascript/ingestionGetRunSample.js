// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a run of an ingestion
 *
 * @summary get a run of an ingestion
 * x-ms-original-file: 2025-04-30-preview/IngestionRuns_Get.json
 */
async function ingestionRunsGet() {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.ingestion.getRun(
    "naip-atl",
    "00000000-0000-0000-0000-000000000000",
    "00000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

async function main() {
  await ingestionRunsGet();
}

main().catch(console.error);
