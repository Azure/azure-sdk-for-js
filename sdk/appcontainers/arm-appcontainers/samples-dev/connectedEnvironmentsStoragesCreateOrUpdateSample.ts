// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ConnectedEnvironmentStorage,
  ContainerAppsAPIClient,
} from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create or update storage for a connectedEnvironment.
 *
 * @summary Create or update storage for a connectedEnvironment.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/stable/2025-01-01/examples/ConnectedEnvironmentsStorages_CreateOrUpdate.json
 */
async function createOrUpdateEnvironmentsStorage(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const resourceGroupName =
    process.env["APPCONTAINERS_RESOURCE_GROUP"] || "examplerg";
  const connectedEnvironmentName = "env";
  const storageName = "jlaw-demo1";
  const storageEnvelope: ConnectedEnvironmentStorage = {
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
  const result = await client.connectedEnvironmentsStorages.createOrUpdate(
    resourceGroupName,
    connectedEnvironmentName,
    storageName,
    storageEnvelope,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateEnvironmentsStorage();
}

main().catch(console.error);
