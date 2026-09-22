// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Creates a new static site in an existing resource group, or updates an existing static site.
 *
 * @summary description for Creates a new static site in an existing resource group, or updates an existing static site.
 * x-ms-original-file: 2025-05-01/PatchStaticSite.json
 */
async function patchAStaticSite() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.updateStaticSite("rg", "testStaticSite0", {});
  console.log(result);
}

async function main() {
  await patchAStaticSite();
}

main().catch(console.error);
