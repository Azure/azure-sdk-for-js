// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Gets the config reference and status of an app
 *
 * @summary description for Gets the config reference and status of an app
 * x-ms-original-file: 2025-05-01/GetKeyVaultReferencesForAppSettingSlot.json
 */
async function getAzureKeyVaultSlotAppSettingReference() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.getAppSettingKeyVaultReferenceSlot(
    "testrg123",
    "testc6282",
    "setting",
    "stage",
  );
  console.log(result);
}

async function main() {
  await getAzureKeyVaultSlotAppSettingReference();
}

main().catch(console.error);
