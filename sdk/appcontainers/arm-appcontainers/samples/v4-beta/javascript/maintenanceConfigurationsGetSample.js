// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the maintenance configuration of a ManagedEnvironment .
 *
 * @summary gets the maintenance configuration of a ManagedEnvironment .
 * x-ms-original-file: 2025-10-02-preview/ManagedEnvironment_MaintenanceConfigurations_Get.json
 */
async function managedEnvironmentMaintenanceConfigurationsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.maintenanceConfigurations.get("rg1", "managedEnv", "default");
  console.log(result);
}

async function main() {
  await managedEnvironmentMaintenanceConfigurationsGet();
}

main().catch(console.error);
