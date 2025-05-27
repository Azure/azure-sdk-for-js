// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to action to Apply Maintenance window on the Service Fabric Managed Clusters, right now. Any pending update will be applied.
 *
 * @summary action to Apply Maintenance window on the Service Fabric Managed Clusters, right now. Any pending update will be applied.
 * x-ms-original-file: 2025-03-01-preview/ManagedApplyMaintenanceWindowPost_example.json
 */
async function applyMaintenanceWindowStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  await client.managedApplyMaintenanceWindow.post("resourceGroup1", "mycluster1");
}

async function main(): Promise<void> {
  await applyMaintenanceWindowStatus();
}

main().catch(console.error);
