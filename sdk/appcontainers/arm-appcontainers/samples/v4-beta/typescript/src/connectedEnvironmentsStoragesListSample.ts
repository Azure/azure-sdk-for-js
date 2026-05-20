// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get all storages for a connectedEnvironment.
 *
 * @summary get all storages for a connectedEnvironment.
 * x-ms-original-file: 2025-10-02-preview/ConnectedEnvironmentsStorages_List.json
 */
async function listEnvironmentsStoragesBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.connectedEnvironmentsStorages.list("examplerg", "managedEnv");
  console.log(result);
}

async function main(): Promise<void> {
  await listEnvironmentsStoragesBySubscription();
}

main().catch(console.error);
