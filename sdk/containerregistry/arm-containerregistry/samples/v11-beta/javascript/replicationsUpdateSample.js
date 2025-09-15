// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a replication for a container registry with the specified parameters.
 *
 * @summary updates a replication for a container registry with the specified parameters.
 * x-ms-original-file: 2025-05-01-preview/ReplicationUpdate.json
 */
async function replicationUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.replications.update(
    "myResourceGroup",
    "myRegistry",
    "myReplication",
    { tags: { key: "value" } },
  );
  console.log(result);
}

async function main() {
  await replicationUpdate();
}

main().catch(console.error);
