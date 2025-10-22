// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  MaintenanceConfigurationResource} from "@azure/arm-appcontainers";
import {
  ContainerAppsAPIClient,
} from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create or update the maintenance configuration for Managed Environment.
 *
 * @summary Create or update the maintenance configuration for Managed Environment.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/ContainerApps/stable/2025-07-01/examples/ManagedEnvironment_MaintenanceConfigurations_CreateOrUpdate.json
 */
async function managedEnvironmentMaintenanceConfigurationsCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const resourceGroupName =
    process.env["APPCONTAINERS_RESOURCE_GROUP"] || "rg1";
  const environmentName = "managedEnv";
  const configName = "default";
  const maintenanceConfigurationEnvelope: MaintenanceConfigurationResource = {
    scheduledEntries: [
      { durationHours: 9, startHourUtc: 12, weekDay: "Sunday" },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.maintenanceConfigurations.createOrUpdate(
    resourceGroupName,
    environmentName,
    configName,
    maintenanceConfigurationEnvelope,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await managedEnvironmentMaintenanceConfigurationsCreateOrUpdate();
}

main().catch(console.error);
