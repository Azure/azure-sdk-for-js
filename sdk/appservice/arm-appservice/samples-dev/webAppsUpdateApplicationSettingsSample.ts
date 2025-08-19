// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Description for Replaces the application settings of an app.
 *
 * @summary Description for Replaces the application settings of an app.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2024-11-01/examples/UpdateAppSettings.json
 */

import {
  StringDictionary,
  WebSiteManagementClient,
} from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateAppSettings(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPSERVICE_RESOURCE_GROUP"] || "testrg123";
  const name = "sitef6141";
  const appSettings: StringDictionary = {
    properties: { setting1: "Value1", setting2: "Value2" },
  };
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.updateApplicationSettings(
    resourceGroupName,
    name,
    appSettings,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAppSettings();
}

main().catch(console.error);
