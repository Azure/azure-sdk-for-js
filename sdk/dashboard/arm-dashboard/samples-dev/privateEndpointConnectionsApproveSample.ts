// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to manual approve private endpoint connection
 *
 * @summary manual approve private endpoint connection
 * x-ms-original-file: 2024-11-01-preview/PrivateEndpointConnections_Approve.json
 */

import { DashboardManagementClient } from "@azure/arm-dashboard";
import { DefaultAzureCredential } from "@azure/identity";

async function privateEndpointConnectionsApprove(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.approve(
    "myResourceGroup",
    "myWorkspace",
    "myConnection",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateEndpointConnectionsApprove();
}

main().catch(console.error);
