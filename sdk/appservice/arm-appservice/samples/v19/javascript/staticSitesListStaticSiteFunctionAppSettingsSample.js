// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Gets the application settings of a static site.
 *
 * @summary description for Gets the application settings of a static site.
 * x-ms-original-file: 2025-05-01/ListStaticSiteFunctionAppSettings.json
 */
async function getFunctionAppSettingsOfAStaticSite() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.listStaticSiteFunctionAppSettings(
    "rg",
    "testStaticSite0",
  );
  console.log(result);
}

async function main() {
  await getFunctionAppSettingsOfAStaticSite();
}

main().catch(console.error);
