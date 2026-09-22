// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Deletes the user entry from the static site.
 *
 * @summary description for Deletes the user entry from the static site.
 * x-ms-original-file: 2025-05-01/DeleteStaticSiteUser.json
 */
async function deleteAUserForAStaticSite() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.staticSites.deleteStaticSiteUser("rg", "testStaticSite0", "aad", "1234");
}

async function main() {
  await deleteAUserForAStaticSite();
}

main().catch(console.error);
