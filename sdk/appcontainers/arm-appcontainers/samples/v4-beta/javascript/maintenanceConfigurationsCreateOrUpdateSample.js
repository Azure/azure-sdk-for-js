// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update the maintenance configuration for Managed Environment.
 *
 * @summary create or update the maintenance configuration for Managed Environment.
 * x-ms-original-file: 2025-10-02-preview/ManagedEnvironment_MaintenanceConfigurations_CreateOrUpdate.json
 */
async function managedEnvironmentMaintenanceConfigurationsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.maintenanceConfigurations.createOrUpdate(
    "rg1",
    "managedEnv",
    "default",
    { scheduledEntries: [{ durationHours: 9, startHourUtc: 12, weekDay: "Sunday" }] },
  );
  console.log(result);
}

async function main() {
  await managedEnvironmentMaintenanceConfigurationsCreateOrUpdate();
}

main().catch(console.error);
