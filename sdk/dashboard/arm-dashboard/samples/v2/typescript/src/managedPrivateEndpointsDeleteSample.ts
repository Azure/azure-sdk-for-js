// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DashboardManagementClient } from "@azure/arm-dashboard";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a managed private endpoint for a grafana resource.
 *
 * @summary delete a managed private endpoint for a grafana resource.
 * x-ms-original-file: 2025-08-01/ManagedPrivateEndpoints_Delete.json
 */
async function managedPrivateEndpointDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  await client.managedPrivateEndpoints.delete("myResourceGroup", "myWorkspace", "myMPEName");
}

async function main(): Promise<void> {
  await managedPrivateEndpointDelete();
}

main().catch(console.error);
