// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to refresh and sync managed private endpoints of a grafana resource to latest state.
 *
 * @summary refresh and sync managed private endpoints of a grafana resource to latest state.
 * x-ms-original-file: 2024-11-01-preview/ManagedPrivateEndpoints_Refresh.json
 */

import { DashboardManagementClient } from "@azure/arm-dashboard";
import { DefaultAzureCredential } from "@azure/identity";

async function managedPrivateEndpointRefresh(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  await client.managedPrivateEndpoints.refresh("myResourceGroup", "myWorkspace");
}

async function main(): Promise<void> {
  await managedPrivateEndpointRefresh();
}

main().catch(console.error);
