// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all maintenance configurations in the specified Managed Environment.
 *
 * @summary gets all maintenance configurations in the specified Managed Environment.
 * x-ms-original-file: 2025-10-02-preview/ManagedEnvironment_MaintenanceConfigurations_List.json
 */
async function managedEnvironmentMaintenanceConfigurationsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.maintenanceConfigurations.list("rg1", "managedEnv")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await managedEnvironmentMaintenanceConfigurationsList();
}

main().catch(console.error);
