// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a database connection for a static site
 *
 * @summary delete a database connection for a static site
 * x-ms-original-file: 2025-05-01/DeleteStaticSiteDatabaseConnection.json
 */
async function deleteADatabaseConnectionFromAStaticSite(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.staticSites.deleteDatabaseConnection("rg", "testStaticSite0", "default");
}

async function main(): Promise<void> {
  await deleteADatabaseConnectionFromAStaticSite();
}

main().catch(console.error);
