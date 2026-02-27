// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EdgeClient } = require("@azure/arm-disconnectedoperations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the hardware settings resource
 *
 * @summary get the hardware settings resource
 * x-ms-original-file: 2026-03-15/HardwareSettings_Get_MaximumSet_Gen.json
 */
async function hardwareSettingsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "AFEEE483-435F-4E9C-8742-4B550746CD70";
  const client = new EdgeClient(credential, subscriptionId);
  const result = await client.hardwareSettings.get(
    "rgdisconnectedOperations",
    "demo-resource",
    "default",
  );
  console.log(result);
}

async function main() {
  await hardwareSettingsGetMaximumSet();
}

main().catch(console.error);
