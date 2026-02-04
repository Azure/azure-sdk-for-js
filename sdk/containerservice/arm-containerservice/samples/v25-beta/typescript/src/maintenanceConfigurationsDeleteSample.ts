// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a maintenance configuration.
 *
 * @summary deletes a maintenance configuration.
 * x-ms-original-file: 2025-10-02-preview/MaintenanceConfigurationsDelete_MaintenanceWindow.json
 */
async function deleteMaintenanceConfigurationForNodeOSUpgrade(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.maintenanceConfigurations.delete(
    "rg1",
    "clustername1",
    "aksManagedNodeOSUpgradeSchedule",
  );
}

async function main(): Promise<void> {
  await deleteMaintenanceConfigurationForNodeOSUpgrade();
}

main().catch(console.error);
