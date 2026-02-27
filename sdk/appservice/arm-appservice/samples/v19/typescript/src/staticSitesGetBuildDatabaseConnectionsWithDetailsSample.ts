// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns details of database connections for a static site build
 *
 * @summary returns details of database connections for a static site build
 * x-ms-original-file: 2025-05-01/GetStaticSiteBuildDatabaseConnectionsWithDetails.json
 */
async function listFullDetailsOfDatabaseConnectionsForTheStaticSiteBuild(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.staticSites.getBuildDatabaseConnectionsWithDetails(
    "rg",
    "testStaticSite0",
    "default",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listFullDetailsOfDatabaseConnectionsForTheStaticSiteBuild();
}

main().catch(console.error);
