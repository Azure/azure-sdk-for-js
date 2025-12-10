// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the mesh membership of a managed cluster.
 *
 * @summary Gets the mesh membership of a managed cluster.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2025-09-02-preview/examples/MeshMemberships_Get.json
 */
async function getMeshMembership() {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const resourceName = "clustername1";
  const meshMembershipName = "meshmembership1";
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.meshMemberships.get(
    resourceGroupName,
    resourceName,
    meshMembershipName,
  );
  console.log(result);
}

async function main() {
  await getMeshMembership();
}

main().catch(console.error);
