// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the properties of the specified replication.
 *
 * @summary gets the properties of the specified replication.
 * x-ms-original-file: 2025-05-01-preview/ReplicationGet.json
 */
async function replicationGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.replications.get("myResourceGroup", "myRegistry", "myReplication");
  console.log(result);
}

async function main(): Promise<void> {
  await replicationGet();
}

main().catch(console.error);
