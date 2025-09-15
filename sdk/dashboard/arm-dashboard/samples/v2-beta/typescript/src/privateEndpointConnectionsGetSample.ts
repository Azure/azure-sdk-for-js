// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DashboardManagementClient } from "@azure/arm-dashboard";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get private endpoint connections.
 *
 * @summary get private endpoint connections.
 * x-ms-original-file: 2024-11-01-preview/PrivateEndpointConnections_Get.json
 */
async function privateEndpointConnectionsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    "myResourceGroup",
    "myWorkspace",
    "myConnection",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateEndpointConnectionsGet();
}

main().catch(console.error);
