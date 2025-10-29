// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a replication for a container registry with the specified parameters.
 *
 * @summary creates a replication for a container registry with the specified parameters.
 * x-ms-original-file: 2025-06-01-preview/ReplicationCreate.json
 */
async function replicationCreate() {
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
 * x-ms-original-file: 2025-06-01-preview/ReplicationCreateZoneRedundant.json
 */
async function replicationCreateZoneRedundant() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.replications.create(
    "myResourceGroup",
    "myRegistry",
    "myReplication",
    {
      location: "eastus",
      tags: { key: "value" },
      properties: { regionEndpointEnabled: true, zoneRedundancy: "Enabled" },
    },
  );
  console.log(result);
}

async function main() {
  await replicationCreate();
  await replicationCreateZoneRedundant();
}

main().catch(console.error);
