// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the Defender for Storage settings for the specified storage account.
 *
 * @summary lists the Defender for Storage settings for the specified storage account.
 * x-ms-original-file: 2025-09-01-preview/DefenderForStorage/ListDefenderForStorageSettings_example.json
 */
async function listsTheDefenderForStorageSettingsForTheSpecifiedStorageAccount() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const resArray = new Array();
  for await (const item of client.defenderForStorage.list(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/SampleRG/providers/Microsoft.Storage/storageAccounts/samplestorageaccount",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsTheDefenderForStorageSettingsForTheSpecifiedStorageAccount();
}

main().catch(console.error);
