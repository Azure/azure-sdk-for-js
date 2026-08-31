// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to list all STAC collections in a GeoCatalog.
 *
 * @summary List all STAC collections.
 */
const { DefaultAzureCredential } = require("@azure/identity");
const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");

async function main() {
  const credential = new DefaultAzureCredential();
  const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "<your-geocatalog-endpoint>";
  const client = new PlanetaryComputerProClient(endpoint, credential);

  const result = await client.stac.getCollections();
  console.log(`Found ${result.collections.length} collections:`);
  for (const collection of result.collections) {
    console.log(`  - ${collection.id}: ${collection.description}`);
  }
}

main().catch(console.error);
