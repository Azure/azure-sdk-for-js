// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a private link resource by a specified group name for a container registry.
 *
 * @summary gets a private link resource by a specified group name for a container registry.
 * x-ms-original-file: 2025-05-01-preview/RegistryGetPrivateLinkResource.json
 */
async function registryGetPrivateLinkResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.registries.getPrivateLinkResource(
    "myResourceGroup",
    "myRegistry",
    "registry",
  );
  console.log(result);
}

async function main() {
  await registryGetPrivateLinkResource();
}

main().catch(console.error);
