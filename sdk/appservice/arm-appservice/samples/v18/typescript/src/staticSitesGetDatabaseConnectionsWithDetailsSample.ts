// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns details of database connections for a static site
 *
 * @summary returns details of database connections for a static site
 * x-ms-original-file: 2025-05-01/GetStaticSiteDatabaseConnectionsWithDetails.json
 */
async function listFullDetailsOfDatabaseConnectionsForTheStaticSite(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.staticSites.getDatabaseConnectionsWithDetails(
    "rg",
    "testStaticSite0",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listFullDetailsOfDatabaseConnectionsForTheStaticSite();
}

main().catch(console.error);
