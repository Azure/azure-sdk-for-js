// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns overviews of database connections for a static site build
 *
 * @summary Returns overviews of database connections for a static site build
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2024-11-01/examples/GetStaticSiteBuildDatabaseConnections.json
 */

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listOverviewsOfDatabaseConnectionsForTheStaticSiteBuild(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPSERVICE_RESOURCE_GROUP"] || "rg";
  const name = "testStaticSite0";
  const environmentName = "default";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.staticSites.listBuildDatabaseConnections(
    resourceGroupName,
    name,
    environmentName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listOverviewsOfDatabaseConnectionsForTheStaticSiteBuild();
}

main().catch(console.error);
