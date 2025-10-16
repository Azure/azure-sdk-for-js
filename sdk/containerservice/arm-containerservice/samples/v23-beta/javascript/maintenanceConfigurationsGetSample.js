// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the specified maintenance configuration of a managed cluster.
 *
 * @summary Gets the specified maintenance configuration of a managed cluster.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2025-07-02-preview/examples/MaintenanceConfigurationsGet.json
 */
async function getMaintenanceConfiguration() {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const resourceName = "clustername1";
  const configName = "default";
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.maintenanceConfigurations.get(
    resourceGroupName,
    resourceName,
    configName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Gets the specified maintenance configuration of a managed cluster.
 *
 * @summary Gets the specified maintenance configuration of a managed cluster.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2025-07-02-preview/examples/MaintenanceConfigurationsGet_MaintenanceWindow.json
 */
async function getMaintenanceConfigurationConfiguredWithMaintenanceWindow() {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
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

async function main() {
  await getMaintenanceConfiguration();
  await getMaintenanceConfigurationConfiguredWithMaintenanceWindow();
}

main().catch(console.error);
