// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Updates a container registry with the specified parameters.
 *
 * @summary Updates a container registry with the specified parameters.
 * x-ms-original-file: specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/Registry/stable/2025-11-01/examples/RegistryUpdate.json
 */
async function registryUpdate() {
  const subscriptionId =
    process.env["CONTAINERREGISTRY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERREGISTRY_RESOURCE_GROUP"] || "myResourceGroup";
  const registryName = "myRegistry";
  const registryUpdateParameters = {
    adminUserEnabled: true,
    roleAssignmentMode: "AbacRepositoryPermissions",
    sku: { name: "Standard" },
    tags: { key: "value" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.registries.beginUpdateAndWait(
    resourceGroupName,
    registryName,
    registryUpdateParameters,
  );
  console.log(result);
}

async function main() {
  await registryUpdate();
}

main().catch(console.error);
