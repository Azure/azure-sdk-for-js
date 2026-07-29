// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete storage for a managedEnvironment.
 *
 * @summary delete storage for a managedEnvironment.
 * x-ms-original-file: 2025-10-02-preview/ManagedEnvironmentsStorages_Delete.json
 */
async function listEnvironmentsStoragesBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.managedEnvironmentsStorages.delete("examplerg", "managedEnv", "jlaw-demo1");
}

async function main(): Promise<void> {
  await listEnvironmentsStoragesBySubscription();
}

main().catch(console.error);
