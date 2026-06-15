// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to cancel a running operation.
 *
 * @summary cancel a running operation.
 */
const { DefaultAzureCredential } = require("@azure/identity");
const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");

async function main() {
  const credential = new DefaultAzureCredential();
  const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "<your-geocatalog-endpoint>";
  const client = new PlanetaryComputerProClient(endpoint, credential);

  await client.ingestion.cancelOperation("00000000-0000-0000-0000-000000000000");
  console.log("Operation cancelled.");
}

main().catch(console.error);
