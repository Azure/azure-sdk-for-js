// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a container registry with the specified parameters.
 *
 * @summary updates a container registry with the specified parameters.
 * x-ms-original-file: 2025-05-01-preview/RegistryUpdate.json
 */
async function registryUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.registries.update("myResourceGroup", "myRegistry", {
    properties: {
      adminUserEnabled: true,
      roleAssignmentMode: "AbacRepositoryPermissions",
    },
    sku: { name: "Standard" },
    tags: { key: "value" },
  });
  console.log(result);
}

async function main() {
  await registryUpdate();
}

main().catch(console.error);
