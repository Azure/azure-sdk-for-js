// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to downloads the updates on a Data Box Edge/Data Box Gateway device.
 *
 * @summary downloads the updates on a Data Box Edge/Data Box Gateway device.
 * x-ms-original-file: 2023-12-01/DownloadUpdatesPost.json
 */
async function downloadUpdatesPost(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  await client.devices.downloadUpdates("testedgedevice", "GroupForEdgeAutomation");
}

async function main(): Promise<void> {
  await downloadUpdatesPost();
}

main().catch(console.error);
