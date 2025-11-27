// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to action to Apply Maintenance window on the Service Fabric Managed Clusters, right now. Any pending update will be applied.
 *
 * @summary action to Apply Maintenance window on the Service Fabric Managed Clusters, right now. Any pending update will be applied.
 * x-ms-original-file: 2025-10-01-preview/ManagedApplyMaintenanceWindowPost_example.json
 */
async function applyMaintenanceWindowStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  await client.managedApplyMaintenanceWindow.post("resourceGroup1", "mycluster1");
}

async function main() {
  await applyMaintenanceWindowStatus();
}

main().catch(console.error);
