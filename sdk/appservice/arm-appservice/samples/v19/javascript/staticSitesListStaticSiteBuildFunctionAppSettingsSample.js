// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Gets the application settings of a static site build.
 *
 * @summary description for Gets the application settings of a static site build.
 * x-ms-original-file: 2025-05-01/ListStaticSiteBuildFunctionAppSettings.json
 */
async function getFunctionAppSettingsOfAStaticSiteBuild() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.listStaticSiteBuildFunctionAppSettings(
    "rg",
    "testStaticSite0",
    "12",
  );
  console.log(result);
}

async function main() {
  await getFunctionAppSettingsOfAStaticSiteBuild();
}

main().catch(console.error);
