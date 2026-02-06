// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the results of a command which has been run on the Managed Cluster.
 *
 * @summary gets the results of a command which has been run on the Managed Cluster.
 * x-ms-original-file: 2025-10-02-preview/RunCommandResultFailed.json
 */
async function commandFailedResult(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.managedClusters.getCommandResult(
    "rg1",
    "clustername1",
    "def7b3ea71bd4f7e9d226ddbc0f00ad9",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets the results of a command which has been run on the Managed Cluster.
 *
 * @summary gets the results of a command which has been run on the Managed Cluster.
 * x-ms-original-file: 2025-10-02-preview/RunCommandResultSucceed.json
 */
async function commandSucceedResult(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.managedClusters.getCommandResult(
    "rg1",
    "clustername1",
    "def7b3ea71bd4f7e9d226ddbc0f00ad9",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await commandFailedResult();
  await commandSucceedResult();
}

main().catch(console.error);
