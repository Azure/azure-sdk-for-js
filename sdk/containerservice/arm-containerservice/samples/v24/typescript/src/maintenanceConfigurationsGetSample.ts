// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the specified maintenance configuration of a managed cluster.
 *
 * @summary Gets the specified maintenance configuration of a managed cluster.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/stable/2025-10-01/examples/MaintenanceConfigurationsGet_MaintenanceWindow.json
 */
async function getMaintenanceConfigurationConfiguredWithMaintenanceWindow(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const resourceName = "clustername1";
  const configName = "aksManagedNodeOSUpgradeSchedule";
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.maintenanceConfigurations.get(
    resourceGroupName,
    resourceName,
    configName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getMaintenanceConfigurationConfiguredWithMaintenanceWindow();
}

main().catch(console.error);
