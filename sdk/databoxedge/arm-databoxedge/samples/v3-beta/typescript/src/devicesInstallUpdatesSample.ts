// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to installs the updates on the Data Box Edge/Data Box Gateway device.
 *
 * @summary installs the updates on the Data Box Edge/Data Box Gateway device.
 * x-ms-original-file: 2023-12-01/InstallUpdatesPost.json
 */
async function installUpdatesPost(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  await client.devices.installUpdates("testedgedevice", "GroupForEdgeAutomation");
}

async function main(): Promise<void> {
  await installUpdatesPost();
}

main().catch(console.error);
