// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a database connection for a static site build
 *
 * @summary delete a database connection for a static site build
 * x-ms-original-file: 2025-05-01/DeleteStaticSiteBuildDatabaseConnection.json
 */
async function deleteADatabaseConnectionFromAStaticSiteBuild() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.staticSites.deleteBuildDatabaseConnection(
    "rg",
    "testStaticSite0",
    "default",
    "default",
  );
}

async function main() {
  await deleteADatabaseConnectionFromAStaticSiteBuild();
}

main().catch(console.error);
