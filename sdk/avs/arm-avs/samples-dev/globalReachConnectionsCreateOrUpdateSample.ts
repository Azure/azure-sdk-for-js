// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a GlobalReachConnection
 *
 * @summary create a GlobalReachConnection
 * x-ms-original-file: 2024-09-01/GlobalReachConnections_CreateOrUpdate.json
 */
async function globalReachConnectionsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.globalReachConnections.createOrUpdate(
    "group1",
    "cloud1",
    "connection1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await globalReachConnectionsCreateOrUpdate();
}

main().catch(console.error);
