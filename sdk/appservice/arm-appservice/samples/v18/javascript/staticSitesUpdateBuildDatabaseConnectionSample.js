// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Create or update a database connection for a static site build
 *
 * @summary description for Create or update a database connection for a static site build
 * x-ms-original-file: 2025-05-01/PatchStaticSiteBuildDatabaseConnection.json
 */
async function patchADatabaseConnectionForAStaticSiteBuild() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.updateBuildDatabaseConnection(
    "rg",
    "testStaticSite0",
    "default",
    "default",
    {},
  );
  console.log(result);
}

async function main() {
  await patchADatabaseConnectionForAStaticSiteBuild();
}

main().catch(console.error);
