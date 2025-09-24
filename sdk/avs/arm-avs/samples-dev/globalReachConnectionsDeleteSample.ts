// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a GlobalReachConnection
 *
 * @summary delete a GlobalReachConnection
 * x-ms-original-file: 2024-09-01/GlobalReachConnections_Delete.json
 */

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

async function globalReachConnectionsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.globalReachConnections.delete("group1", "cloud1", "connection1");
}

async function main(): Promise<void> {
  await globalReachConnectionsDelete();
}

main().catch(console.error);
