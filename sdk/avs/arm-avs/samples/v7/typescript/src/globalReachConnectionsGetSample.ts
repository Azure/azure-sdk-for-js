// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a GlobalReachConnection
 *
 * @summary get a GlobalReachConnection
 * x-ms-original-file: 2024-09-01/GlobalReachConnections_Get.json
 */
async function globalReachConnectionsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.globalReachConnections.get("group1", "cloud1", "connection1");
  console.log(result);
}

async function main(): Promise<void> {
  await globalReachConnectionsGet();
}

main().catch(console.error);
