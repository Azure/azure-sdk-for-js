// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of maintenance configurations in the specified managed cluster.
 *
 * @summary gets a list of maintenance configurations in the specified managed cluster.
 * x-ms-original-file: 2025-10-02-preview/MaintenanceConfigurationsList_MaintenanceWindow.json
 */
async function listMaintenanceConfigurationsConfiguredWithMaintenanceWindowByManagedCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.maintenanceConfigurations.listByManagedCluster(
    "rg1",
    "clustername1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listMaintenanceConfigurationsConfiguredWithMaintenanceWindowByManagedCluster();
}

main().catch(console.error);
