// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or update storage for a managedEnvironment.
 *
 * @summary Create or update storage for a managedEnvironment.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/stable/2025-01-01/examples/ManagedEnvironmentsStorages_CreateOrUpdate.json
 */

import {
  ManagedEnvironmentStorage,
  ContainerAppsAPIClient,
} from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createOrUpdateEnvironmentsStorage(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const resourceGroupName =
    process.env["APPCONTAINERS_RESOURCE_GROUP"] || "examplerg";
  const environmentName = "managedEnv";
  const storageName = "jlaw-demo1";
  const storageEnvelope: ManagedEnvironmentStorage = {
    properties: {
      azureFile: {
        accessMode: "ReadOnly",
        accountKey: "key",
        accountName: "account1",
        shareName: "share1",
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.managedEnvironmentsStorages.createOrUpdate(
    resourceGroupName,
    environmentName,
    storageName,
    storageEnvelope,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create or update storage for a managedEnvironment.
 *
 * @summary Create or update storage for a managedEnvironment.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/stable/2025-01-01/examples/ManagedEnvironmentsStorages_CreateOrUpdate_NfsAzureFile.json
 */
async function createOrUpdateEnvironmentsStorageForNfsAzureFile(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const resourceGroupName =
    process.env["APPCONTAINERS_RESOURCE_GROUP"] || "examplerg";
  const environmentName = "managedEnv";
  const storageName = "jlaw-demo1";
  const storageEnvelope: ManagedEnvironmentStorage = {
    properties: {
      nfsAzureFile: {
        accessMode: "ReadOnly",
        server: "server1",
        shareName: "share1",
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.managedEnvironmentsStorages.createOrUpdate(
    resourceGroupName,
    environmentName,
    storageName,
    storageEnvelope,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateEnvironmentsStorage();
  await createOrUpdateEnvironmentsStorageForNfsAzureFile();
}

main().catch(console.error);
