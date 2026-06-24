// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to get mosaic search query metadata.
 *
 * @summary get mosaic search query metadata.
 */
const { DefaultAzureCredential } = require("@azure/identity");
const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");

async function main() {
  const credential = new DefaultAzureCredential();
  const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "<your-geocatalog-endpoint>";
  const client = new PlanetaryComputerProClient(endpoint, credential);

  const result = await client.data.getSearchInfo("ba13fc7947b9b585690d84ee61aaa653");
  console.log(result);
}

main().catch(console.error);
