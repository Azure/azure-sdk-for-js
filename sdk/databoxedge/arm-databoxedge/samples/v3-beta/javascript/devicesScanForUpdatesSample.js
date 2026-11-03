// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxEdgeManagementClient } = require("@azure/arm-databoxedge");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to scans for updates on a Data Box Edge/Data Box Gateway device.
 *
 * @summary scans for updates on a Data Box Edge/Data Box Gateway device.
 * x-ms-original-file: 2023-12-01/ScanForUpdatesPost.json
 */
async function scanForUpdatesPost() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  await client.devices.scanForUpdates("testedgedevice", "GroupForEdgeAutomation");
}

async function main() {
  await scanForUpdatesPost();
}

main().catch(console.error);
