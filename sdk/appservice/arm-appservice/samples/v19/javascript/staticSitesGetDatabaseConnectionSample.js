// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns overview of a database connection for a static site by name
 *
 * @summary returns overview of a database connection for a static site by name
 * x-ms-original-file: 2025-05-01/GetStaticSiteDatabaseConnection.json
 */
async function getOverviewOfDatabaseConnectionsForTheStaticSite() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.getDatabaseConnection("rg", "testStaticSite0", "default");
  console.log(result);
}

async function main() {
  await getOverviewOfDatabaseConnectionsForTheStaticSite();
}

main().catch(console.error);
