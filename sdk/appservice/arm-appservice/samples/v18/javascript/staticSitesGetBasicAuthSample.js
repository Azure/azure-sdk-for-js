// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Gets the basic auth properties for a static site.
 *
 * @summary description for Gets the basic auth properties for a static site.
 * x-ms-original-file: 2025-05-01/GetStaticSiteBasicAuth.json
 */
async function getsTheBasicAuthPropertiesForAStaticSite() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.getBasicAuth("rg", "testStaticSite0", "default");
  console.log(result);
}

async function main() {
  await getsTheBasicAuthPropertiesForAStaticSite();
}

main().catch(console.error);
