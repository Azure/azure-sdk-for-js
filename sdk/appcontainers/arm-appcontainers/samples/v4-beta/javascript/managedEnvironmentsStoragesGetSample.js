// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get storage for a managedEnvironment.
 *
 * @summary get storage for a managedEnvironment.
 * x-ms-original-file: 2025-10-02-preview/ManagedEnvironmentsStorages_Get.json
 */
async function getAEnvironmentsStorage() {
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
async function getAEnvironmentsStorageForNFSAzureFile() {
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

async function main() {
  await getAEnvironmentsStorage();
  await getAEnvironmentsStorageForNFSAzureFile();
}

main().catch(console.error);
