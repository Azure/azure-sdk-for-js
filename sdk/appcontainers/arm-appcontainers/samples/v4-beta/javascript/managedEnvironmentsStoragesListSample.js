// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all storages for a managedEnvironment.
 *
 * @summary get all storages for a managedEnvironment.
 * x-ms-original-file: 2025-10-02-preview/ManagedEnvironmentsStorages_List.json
 */
async function listEnvironmentsStoragesBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.managedEnvironmentsStorages.list("examplerg", "managedEnv");
  console.log(result);
}

async function main() {
  await listEnvironmentsStoragesBySubscription();
}

main().catch(console.error);
