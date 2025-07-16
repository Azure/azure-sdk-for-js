// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DashboardManagementClient } = require("@azure/arm-dashboard");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to refresh and sync managed private endpoints of a grafana resource to latest state.
 *
 * @summary refresh and sync managed private endpoints of a grafana resource to latest state.
 * x-ms-original-file: 2024-11-01-preview/ManagedPrivateEndpoints_Refresh.json
 */
async function managedPrivateEndpointRefresh() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  await client.managedPrivateEndpoints.refresh("myResourceGroup", "myWorkspace");
}

async function main() {
  await managedPrivateEndpointRefresh();
}

main().catch(console.error);
