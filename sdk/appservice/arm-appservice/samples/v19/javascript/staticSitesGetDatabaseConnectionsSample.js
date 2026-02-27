// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns overviews of database connections for a static site
 *
 * @summary returns overviews of database connections for a static site
 * x-ms-original-file: 2025-05-01/GetStaticSiteDatabaseConnections.json
 */
async function listOverviewsOfDatabaseConnectionsForTheStaticSite() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.staticSites.getDatabaseConnections("rg", "testStaticSite0")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listOverviewsOfDatabaseConnectionsForTheStaticSite();
}

main().catch(console.error);
