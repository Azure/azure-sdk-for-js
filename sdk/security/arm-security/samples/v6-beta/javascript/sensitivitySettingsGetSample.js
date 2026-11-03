// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets data sensitivity settings for sensitive data discovery
 *
 * @summary gets data sensitivity settings for sensitive data discovery
 * x-ms-original-file: 2023-02-15-preview/SensitivitySettings/GetSensitivitySettings_example.json
 */
async function getSensitivitySettings() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.sensitivitySettings.get();
  console.log(result);
}

async function main() {
  await getSensitivitySettings();
}

main().catch(console.error);
