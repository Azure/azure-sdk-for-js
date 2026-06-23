// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxEdgeManagementClient } = require("@azure/arm-databoxedge");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about the availability of updates based on the last scan of the device. It also gets information about any ongoing download or install jobs on the device.
 *
 * @summary gets information about the availability of updates based on the last scan of the device. It also gets information about any ongoing download or install jobs on the device.
 * x-ms-original-file: 2023-12-01/UpdateSummaryGet.json
 */
async function updateSummaryGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.devices.getUpdateSummary("testedgedevice", "GroupForEdgeAutomation");
  console.log(result);
}

async function main() {
  await updateSummaryGet();
}

main().catch(console.error);
