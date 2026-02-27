// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Gets the config reference app settings and status of an app
 *
 * @summary description for Gets the config reference app settings and status of an app
 * x-ms-original-file: 2025-05-01/GetKeyVaultReferencesForAppSettingsSlot.json
 */
async function getAzureKeyVaultReferencesForAppSettingsForSlot() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.webApps.getAppSettingsKeyVaultReferencesSlot(
    "testrg123",
    "testc6282",
    "stage",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAzureKeyVaultReferencesForAppSettingsForSlot();
}

main().catch(console.error);
