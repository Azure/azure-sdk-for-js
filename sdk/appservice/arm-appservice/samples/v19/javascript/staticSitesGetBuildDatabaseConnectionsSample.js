// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns overviews of database connections for a static site build
 *
 * @summary returns overviews of database connections for a static site build
 * x-ms-original-file: 2025-05-01/GetStaticSiteBuildDatabaseConnections.json
 */
async function listOverviewsOfDatabaseConnectionsForTheStaticSiteBuild() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.staticSites.getBuildDatabaseConnections(
    "rg",
    "testStaticSite0",
    "default",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listOverviewsOfDatabaseConnectionsForTheStaticSiteBuild();
}

main().catch(console.error);
