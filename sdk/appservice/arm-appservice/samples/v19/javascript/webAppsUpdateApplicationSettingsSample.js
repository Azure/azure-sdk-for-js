// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Replaces the application settings of an app.
 *
 * @summary description for Replaces the application settings of an app.
 * x-ms-original-file: 2025-05-01/UpdateAppSettings.json
 */
async function updateAppSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.updateApplicationSettings("testrg123", "sitef6141", {
    properties: { Setting1: "Value1", Setting2: "Value2" },
  });
  console.log(result);
}

async function main() {
  await updateAppSettings();
}

main().catch(console.error);
