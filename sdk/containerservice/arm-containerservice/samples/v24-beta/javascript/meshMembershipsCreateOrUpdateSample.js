// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates the mesh membership of a managed cluster.
 *
 * @summary Creates or updates the mesh membership of a managed cluster.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2025-09-02-preview/examples/MeshMemberships_CreateOrUpdate.json
 */
async function createOrUpdateMeshMembership() {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const resourceName = "clustername1";
  const meshMembershipName = "meshmembership1";
  const parameters = {
    properties: {
      managedMeshID:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.AppLink/applinks/applink1/appLinkMembers/member1",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.meshMemberships.beginCreateOrUpdateAndWait(
    resourceGroupName,
    resourceName,
    meshMembershipName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createOrUpdateMeshMembership();
}

main().catch(console.error);
