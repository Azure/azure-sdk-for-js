// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns overviews of database connections for a static site
 *
 * @summary returns overviews of database connections for a static site
 * x-ms-original-file: 2025-05-01/GetStaticSiteDatabaseConnections.json
 */
async function listOverviewsOfDatabaseConnectionsForTheStaticSite(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.staticSites.getDatabaseConnections("rg", "testStaticSite0")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listOverviewsOfDatabaseConnectionsForTheStaticSite();
}

main().catch(console.error);
