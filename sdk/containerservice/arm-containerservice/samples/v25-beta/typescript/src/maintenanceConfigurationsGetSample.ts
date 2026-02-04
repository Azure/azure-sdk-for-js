// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified maintenance configuration of a managed cluster.
 *
 * @summary gets the specified maintenance configuration of a managed cluster.
 * x-ms-original-file: 2025-10-02-preview/MaintenanceConfigurationsGet_MaintenanceWindow.json
 */
async function getMaintenanceConfigurationConfiguredWithMaintenanceWindow(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.maintenanceConfigurations.get(
    "rg1",
    "clustername1",
    "aksManagedNodeOSUpgradeSchedule",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getMaintenanceConfigurationConfiguredWithMaintenanceWindow();
}

main().catch(console.error);
