// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to refreshes the share metadata with the data from the cloud.
 *
 * @summary refreshes the share metadata with the data from the cloud.
 * x-ms-original-file: 2023-12-01/ShareRefreshPost.json
 */
async function shareRefreshPost(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  await client.shares.refresh("testedgedevice", "smbshare", "GroupForEdgeAutomation");
}

async function main(): Promise<void> {
  await shareRefreshPost();
}

main().catch(console.error);
