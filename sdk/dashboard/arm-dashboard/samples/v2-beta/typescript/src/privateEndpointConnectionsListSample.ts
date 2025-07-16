// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DashboardManagementClient } from "@azure/arm-dashboard";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get private endpoint connection
 *
 * @summary get private endpoint connection
 * x-ms-original-file: 2024-11-01-preview/PrivateEndpointConnections_List.json
 */
async function privateEndpointConnectionsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.list(
    "myResourceGroup",
    "myWorkspace",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await privateEndpointConnectionsList();
}

main().catch(console.error);
