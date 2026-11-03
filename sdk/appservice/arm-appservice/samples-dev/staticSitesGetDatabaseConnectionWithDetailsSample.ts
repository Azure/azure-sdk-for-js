// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns details of a database connection for a static site by name
 *
 * @summary returns details of a database connection for a static site by name
 * x-ms-original-file: 2025-05-01/GetStaticSiteDatabaseConnectionWithDetails.json
 */
async function getDetailsOfDatabaseConnectionsForTheStaticSite(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.getDatabaseConnectionWithDetails(
    "rg",
    "testStaticSite0",
    "default",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getDetailsOfDatabaseConnectionsForTheStaticSite();
}

main().catch(console.error);
