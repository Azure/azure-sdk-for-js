// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceUpdateClient } = require("@azure/arm-deviceregistrysoftwareupdate");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns update instance details for the given update instance name.
 *
 * @summary returns update instance details for the given update instance name.
 * x-ms-original-file: 2026-11-02-preview/UpdateInstances_Get.json
 */
async function getsUpdateInstanceDetails() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceUpdateClient(credential, subscriptionId);
  const result = await client.updateInstances.get("test-rg", "contoso");
  console.log(result);
}

async function main() {
  await getsUpdateInstanceDetails();
}

main().catch(console.error);
