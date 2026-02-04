// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the mesh membership of a managed cluster.
 *
 * @summary gets the mesh membership of a managed cluster.
 * x-ms-original-file: 2025-10-02-preview/MeshMemberships_Get.json
 */
async function getMeshMembership() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.meshMemberships.get("rg1", "clustername1", "meshmembership1");
  console.log(result);
}

async function main() {
  await getMeshMembership();
}

main().catch(console.error);
