// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a specific silo for a Web App.
 *
 * @summary gets a specific silo for a Web App.
 * x-ms-original-file: 2026-08-01/SiteSiloResources_GetSiteSilo.json
 */
async function getASiloOfAWebApp() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.siteSiloResources.getSiteSilo("testrg123", "sitef6141", "silo1");
  console.log(result);
}

async function main() {
  await getASiloOfAWebApp();
}

main().catch(console.error);
