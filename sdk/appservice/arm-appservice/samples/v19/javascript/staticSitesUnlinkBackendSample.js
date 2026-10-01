// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to unlink a backend from a static site
 *
 * @summary unlink a backend from a static site
 * x-ms-original-file: 2025-05-01/UnlinkBackendFromStaticSite.json
 */
async function unlinkABackendFromAStaticSite() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.staticSites.unlinkBackend("rg", "testStaticSite0", "testBackend");
}

async function main() {
  await unlinkABackendFromAStaticSite();
}

main().catch(console.error);
