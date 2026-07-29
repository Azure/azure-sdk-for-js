// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update storage for a managedEnvironment.
 *
 * @summary create or update storage for a managedEnvironment.
 * x-ms-original-file: 2025-10-02-preview/ManagedEnvironmentsStorages_CreateOrUpdate.json
 */
async function createOrUpdateEnvironmentsStorage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.managedEnvironmentsStorages.createOrUpdate(
    "examplerg",
    "managedEnv",
    "jlaw-demo1",
    {
      properties: {
        azureFile: {
          accessMode: "ReadOnly",
          accountKey: "key",
          accountName: "account1",
          shareName: "share1",
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update storage for a managedEnvironment.
 *
 * @summary create or update storage for a managedEnvironment.
 * x-ms-original-file: 2025-10-02-preview/ManagedEnvironmentsStorages_CreateOrUpdate_NfsAzureFile.json
 */
async function createOrUpdateEnvironmentsStorageForNFSAzureFile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.managedEnvironmentsStorages.createOrUpdate(
    "examplerg",
    "managedEnv",
    "jlaw-demo1",
    {
      properties: {
        nfsAzureFile: { accessMode: "ReadOnly", server: "server1", shareName: "share1" },
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateEnvironmentsStorage();
  await createOrUpdateEnvironmentsStorageForNFSAzureFile();
}

main().catch(console.error);
