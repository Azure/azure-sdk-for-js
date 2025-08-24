// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes the maintenance configuration of a ManagedEnvironment .
 *
 * @summary Deletes the maintenance configuration of a ManagedEnvironment .
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2025-02-02-preview/examples/ManagedEnvironment_MaintenanceConfigurations_Delete.json
 */
async function managedEnvironmentMaintenanceConfigurationsDelete(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const resourceGroupName =
    process.env["APPCONTAINERS_RESOURCE_GROUP"] || "rg1";
  const environmentName = "managedEnv";
  const configName = "default";
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.maintenanceConfigurations.delete(
    resourceGroupName,
    environmentName,
    configName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await managedEnvironmentMaintenanceConfigurationsDelete();
}

main().catch(console.error);
