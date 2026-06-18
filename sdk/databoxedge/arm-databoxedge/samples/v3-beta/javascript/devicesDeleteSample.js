// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxEdgeManagementClient } = require("@azure/arm-databoxedge");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the Data Box Edge/Data Box Gateway device.
 *
 * @summary deletes the Data Box Edge/Data Box Gateway device.
 * x-ms-original-file: 2023-12-01/DataBoxEdgeDeviceDelete.json
 */
async function dataBoxEdgeDeviceDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  await client.devices.delete("testedgedevice", "GroupForEdgeAutomation");
}

async function main() {
  await dataBoxEdgeDeviceDelete();
}

main().catch(console.error);
