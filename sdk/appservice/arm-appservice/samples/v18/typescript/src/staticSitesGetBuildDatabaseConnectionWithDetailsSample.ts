// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns details of a database connection for a static site build by name
 *
 * @summary returns details of a database connection for a static site build by name
 * x-ms-original-file: 2025-05-01/GetStaticSiteBuildDatabaseConnectionWithDetails.json
 */
async function getDetailsOfDatabaseConnectionsForTheStaticSiteBuild(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.getBuildDatabaseConnectionWithDetails(
    "rg",
    "testStaticSite0",
    "default",
    "default",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getDetailsOfDatabaseConnectionsForTheStaticSiteBuild();
}

main().catch(console.error);
