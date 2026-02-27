// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EdgeClient } = require("@azure/arm-disconnectedoperations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete hardware settings
 *
 * @summary delete hardware settings
 * x-ms-original-file: 2026-03-15/HardwareSettings_Delete_MaximumSet_Gen.json
 */
async function hardwareSettingsDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "AFEEE483-435F-4E9C-8742-4B550746CD70";
  const client = new EdgeClient(credential, subscriptionId);
  await client.hardwareSettings.delete("rgdisconnectedOperations", "demo-resource", "default");
}

async function main() {
  await hardwareSettingsDeleteMaximumSet();
}

main().catch(console.error);
