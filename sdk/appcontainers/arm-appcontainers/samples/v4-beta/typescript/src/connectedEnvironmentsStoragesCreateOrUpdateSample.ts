// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update storage for a connectedEnvironment.
 *
 * @summary create or update storage for a connectedEnvironment.
 * x-ms-original-file: 2025-10-02-preview/ConnectedEnvironmentsStorages_CreateOrUpdate.json
 */
async function createOrUpdateEnvironmentsStorage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.connectedEnvironmentsStorages.createOrUpdate(
    "examplerg",
    "env",
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

async function main(): Promise<void> {
  await createOrUpdateEnvironmentsStorage();
}

main().catch(console.error);
