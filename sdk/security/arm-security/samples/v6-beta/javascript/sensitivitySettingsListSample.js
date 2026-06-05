// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list with a single sensitivity settings resource
 *
 * @summary gets a list with a single sensitivity settings resource
 * x-ms-original-file: 2023-02-15-preview/SensitivitySettings/GetSensitivitySettingsList_example.json
 */
async function getSensitivitySettingsList() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.sensitivitySettings.list();
  console.log(result);
}

async function main() {
  await getSensitivitySettingsList();
}

main().catch(console.error);
