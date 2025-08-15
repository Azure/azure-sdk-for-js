// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to action to get Maintenance Window Status of the Service Fabric Managed Clusters.
 *
 * @summary action to get Maintenance Window Status of the Service Fabric Managed Clusters.
 * x-ms-original-file: 2025-06-01-preview/ManagedMaintenanceWindowStatusGet_example.json
 */
async function getMaintenanceWindowStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.managedMaintenanceWindowStatus.get("resourceGroup1", "mycluster1");
  console.log(result);
}

async function main() {
  await getMaintenanceWindowStatus();
}

main().catch(console.error);
