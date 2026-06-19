// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Gets the application settings of an app.
 *
 * @summary description for Gets the application settings of an app.
 * x-ms-original-file: 2025-05-01/ListAppSettings.json
 */
async function listAppSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.listApplicationSettings("testrg123", "sitef6141");
  console.log(result);
}

async function main() {
  await listAppSettings();
}

main().catch(console.error);
