// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Deletes a maintenance configuration.
 *
 * @summary Deletes a maintenance configuration.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/stable/2025-10-01/examples/MaintenanceConfigurationsDelete_MaintenanceWindow.json
 */
async function deleteMaintenanceConfigurationForNodeOSUpgrade() {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const resourceName = "clustername1";
  const configName = "aksManagedNodeOSUpgradeSchedule";
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.maintenanceConfigurations.delete(
    resourceGroupName,
    resourceName,
    configName,
  );
  console.log(result);
}

async function main() {
  await deleteMaintenanceConfigurationForNodeOSUpgrade();
}

main().catch(console.error);
