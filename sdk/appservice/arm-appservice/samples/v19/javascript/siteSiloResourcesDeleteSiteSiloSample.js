// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a silo for a Web App.
 *
 * @summary deletes a silo for a Web App.
 * x-ms-original-file: 2026-08-01/SiteSiloResources_DeleteSiteSilo.json
 */
async function deleteASiloOfAWebApp() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.siteSiloResources.deleteSiteSilo("testrg123", "sitef6141", "silo1");
}

async function main() {
  await deleteASiloOfAWebApp();
}

main().catch(console.error);
