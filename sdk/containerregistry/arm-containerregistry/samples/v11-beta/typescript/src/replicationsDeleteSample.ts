// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a replication from a container registry.
 *
 * @summary deletes a replication from a container registry.
 * x-ms-original-file: 2025-06-01-preview/ReplicationDelete.json
 */
async function replicationDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  await client.replications.delete("myResourceGroup", "myRegistry", "myReplication");
}

async function main(): Promise<void> {
  await replicationDelete();
}

main().catch(console.error);
