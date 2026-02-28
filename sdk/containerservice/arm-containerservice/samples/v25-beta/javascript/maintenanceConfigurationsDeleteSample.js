// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a maintenance configuration.
 *
 * @summary deletes a maintenance configuration.
 * x-ms-original-file: 2025-10-02-preview/MaintenanceConfigurationsDelete_MaintenanceWindow.json
 */
async function deleteMaintenanceConfigurationForNodeOSUpgrade() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.maintenanceConfigurations.delete(
    "rg1",
    "clustername1",
    "aksManagedNodeOSUpgradeSchedule",
  );
}

async function main() {
  await deleteMaintenanceConfigurationForNodeOSUpgrade();
}

main().catch(console.error);
