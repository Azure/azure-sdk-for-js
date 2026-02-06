// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the mesh membership of a managed cluster.
 *
 * @summary deletes the mesh membership of a managed cluster.
 * x-ms-original-file: 2025-10-02-preview/MeshMemberships_Delete.json
 */
async function deleteMeshMembership() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.meshMemberships.delete("rg1", "clustername1", "meshmembership1");
}

async function main() {
  await deleteMeshMembership();
}

main().catch(console.error);
