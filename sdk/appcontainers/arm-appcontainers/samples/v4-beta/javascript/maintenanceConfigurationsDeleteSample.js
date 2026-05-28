// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the maintenance configuration of a ManagedEnvironment .
 *
 * @summary deletes the maintenance configuration of a ManagedEnvironment .
 * x-ms-original-file: 2025-10-02-preview/ManagedEnvironment_MaintenanceConfigurations_Delete.json
 */
async function managedEnvironmentMaintenanceConfigurationsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.maintenanceConfigurations.delete("rg1", "managedEnv", "default");
}

async function main() {
  await managedEnvironmentMaintenanceConfigurationsDelete();
}

main().catch(console.error);
