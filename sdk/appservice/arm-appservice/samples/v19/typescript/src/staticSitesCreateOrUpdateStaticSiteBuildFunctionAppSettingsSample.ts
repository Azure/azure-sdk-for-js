// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Creates or updates the function app settings of a static site build.
 *
 * @summary description for Creates or updates the function app settings of a static site build.
 * x-ms-original-file: 2025-05-01/CreateOrUpdateStaticSiteBuildFunctionAppSettings.json
 */
async function createsOrUpdatesTheFunctionAppSettingsOfAStaticSiteBuild(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.createOrUpdateStaticSiteBuildFunctionAppSettings(
    "rg",
    "testStaticSite0",
    "12",
    { properties: { setting1: "someval", setting2: "someval2" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createsOrUpdatesTheFunctionAppSettingsOfAStaticSiteBuild();
}

main().catch(console.error);
