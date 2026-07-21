// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to list runs of an ingestion.
 *
 * @summary list runs of an ingestion.
 */
const { DefaultAzureCredential } = require("@azure/identity");
const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");

async function main() {
  const credential = new DefaultAzureCredential();
  const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "<your-geocatalog-endpoint>";
  const collectionId = process.env.PLANETARYCOMPUTER_COLLECTION_ID || "naip";
  const client = new PlanetaryComputerProClient(endpoint, credential);

  const resArray = [];
  for await (const item of client.ingestion.listRuns(
    collectionId,
    "00000000-0000-0000-0000-000000000000",
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

main().catch(console.error);
