// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the mesh membership of a managed cluster.
 *
 * @summary gets the mesh membership of a managed cluster.
 * x-ms-original-file: 2025-10-02-preview/MeshMemberships_Get.json
 */
async function getMeshMembership(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.meshMemberships.get("rg1", "clustername1", "meshmembership1");
  console.log(result);
}

async function main(): Promise<void> {
  await getMeshMembership();
}

main().catch(console.error);
