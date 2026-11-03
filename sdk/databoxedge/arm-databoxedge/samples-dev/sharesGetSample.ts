// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a share by name.
 *
 * @summary gets a share by name.
 * x-ms-original-file: 2023-12-01/ShareGet.json
 */
async function shareGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.shares.get("testedgedevice", "smbshare", "GroupForEdgeAutomation");
  console.log(result);
}

async function main(): Promise<void> {
  await shareGet();
}

main().catch(console.error);
