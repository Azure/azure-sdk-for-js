// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list GlobalReachConnection resources by PrivateCloud
 *
 * @summary list GlobalReachConnection resources by PrivateCloud
 * x-ms-original-file: 2024-09-01/GlobalReachConnections_List.json
 */
async function globalReachConnectionsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.globalReachConnections.list("group1", "cloud1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await globalReachConnectionsList();
}

main().catch(console.error);
