// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a replication for a container registry with the specified parameters.
 *
 * @summary creates a replication for a container registry with the specified parameters.
 * x-ms-original-file: 2025-05-01-preview/ReplicationCreate.json
 */
async function replicationCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.replications.create(
    "myResourceGroup",
    "myRegistry",
    "myReplication",
    { location: "eastus", tags: { key: "value" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a replication for a container registry with the specified parameters.
 *
 * @summary creates a replication for a container registry with the specified parameters.
 * x-ms-original-file: 2025-05-01-preview/ReplicationCreateZoneRedundant.json
 */
async function replicationCreateZoneRedundant(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.replications.create(
    "myResourceGroup",
    "myRegistry",
    "myReplication",
    {
      location: "eastus",
      properties: { regionEndpointEnabled: true, zoneRedundancy: "Enabled" },
      tags: { key: "value" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await replicationCreate();
  await replicationCreateZoneRedundant();
}

main().catch(console.error);
