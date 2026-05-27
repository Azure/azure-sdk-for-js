// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get storage for a managedEnvironment.
 *
 * @summary get storage for a managedEnvironment.
 * x-ms-original-file: 2025-10-02-preview/ManagedEnvironmentsStorages_Get.json
 */
async function getAEnvironmentsStorage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.managedEnvironmentsStorages.get(
    "examplerg",
    "managedEnv",
    "jlaw-demo1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get storage for a managedEnvironment.
 *
 * @summary get storage for a managedEnvironment.
 * x-ms-original-file: 2025-10-02-preview/ManagedEnvironmentsStorages_Get_NfsAzureFile.json
 */
async function getAEnvironmentsStorageForNFSAzureFile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.managedEnvironmentsStorages.get(
    "examplerg",
    "managedEnv",
    "jlaw-demo1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAEnvironmentsStorage();
  await getAEnvironmentsStorageForNFSAzureFile();
}

main().catch(console.error);
