// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the definition of an ingestion
 *
 * @summary get the definition of an ingestion
 * x-ms-original-file: 2025-04-30-preview/Ingestions_Get.json
 */
async function ingestionsGet() {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.ingestion.get("naip-atl", "00000000-0000-0000-0000-000000000000");
  console.log(result);
}

async function main() {
  await ingestionsGet();
}

main().catch(console.error);
