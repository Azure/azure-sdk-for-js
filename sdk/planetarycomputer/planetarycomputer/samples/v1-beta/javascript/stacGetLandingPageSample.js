// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to return the STAC landing page.
 *
 * @summary return the STAC landing page.
 * x-ms-original-file: 2025-04-30-preview/StacLandingPages_Get.json
 */
async function stacLandingPagesGet() {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.stac.getLandingPage();
  console.log(result);
}

async function main() {
  await stacLandingPagesGet();
}

main().catch(console.error);
