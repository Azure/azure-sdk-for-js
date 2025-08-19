// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Description for Creates or updates the app settings of a static site build.
 *
 * @summary Description for Creates or updates the app settings of a static site build.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2024-11-01/examples/CreateOrUpdateStaticSiteBuildAppSettings.json
 */

import {
  StringDictionary,
  WebSiteManagementClient,
} from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createsOrUpdatesTheFunctionAppSettingsOfAStaticSiteBuild(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPSERVICE_RESOURCE_GROUP"] || "rg";
  const name = "testStaticSite0";
  const environmentName = "12";
  const appSettings: StringDictionary = {
    properties: { setting1: "someval", setting2: "someval2" },
  };
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result =
    await client.staticSites.createOrUpdateStaticSiteBuildAppSettings(
      resourceGroupName,
      name,
      environmentName,
      appSettings,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await createsOrUpdatesTheFunctionAppSettingsOfAStaticSiteBuild();
}

main().catch(console.error);
