// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Deletes a static site build.
 *
 * @summary description for Deletes a static site build.
 * x-ms-original-file: 2025-05-01/DeleteStaticSiteBuild.json
 */
async function deleteAStaticSiteBuild() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.staticSites.deleteStaticSiteBuild("rg", "testStaticSite0", "12");
}

async function main() {
  await deleteAStaticSiteBuild();
}

main().catch(console.error);
