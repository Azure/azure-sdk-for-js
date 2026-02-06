// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates the mesh membership of a managed cluster.
 *
 * @summary creates or updates the mesh membership of a managed cluster.
 * x-ms-original-file: 2025-10-02-preview/MeshMemberships_CreateOrUpdate.json
 */
async function createOrUpdateMeshMembership() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.meshMemberships.createOrUpdate(
    "rg1",
    "clustername1",
    "meshmembership1",
    {
      properties: {
        managedMeshID:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.AppLink/applinks/applink1/appLinkMembers/member1",
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateMeshMembership();
}

main().catch(console.error);
