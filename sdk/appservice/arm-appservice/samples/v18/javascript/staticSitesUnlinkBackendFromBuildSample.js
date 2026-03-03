// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to unlink a backend from a static site build
 *
 * @summary unlink a backend from a static site build
 * x-ms-original-file: 2025-05-01/UnlinkBackendFromStaticSiteBuild.json
 */
async function unlinkABackendFromAStaticSiteBuild() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.staticSites.unlinkBackendFromBuild("rg", "testStaticSite0", "12", "testBackend");
}

async function main() {
  await unlinkABackendFromAStaticSiteBuild();
}

main().catch(console.error);
