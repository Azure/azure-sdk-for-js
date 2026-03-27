// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns overview of a database connection for a static site build by name
 *
 * @summary returns overview of a database connection for a static site build by name
 * x-ms-original-file: 2025-05-01/GetStaticSiteBuildDatabaseConnection.json
 */
async function getOverviewOfDatabaseConnectionsForTheStaticSiteBuild() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.getBuildDatabaseConnection(
    "rg",
    "testStaticSite0",
    "default",
    "default",
  );
  console.log(result);
}

async function main() {
  await getOverviewOfDatabaseConnectionsForTheStaticSiteBuild();
}

main().catch(console.error);
