// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Detaches a static site.
 *
 * @summary description for Detaches a static site.
 * x-ms-original-file: 2025-05-01/DetachStaticSite.json
 */
async function detachAStaticSite() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.staticSites.detachStaticSite("rg", "testStaticSite0");
}

async function main() {
  await detachAStaticSite();
}

main().catch(console.error);
