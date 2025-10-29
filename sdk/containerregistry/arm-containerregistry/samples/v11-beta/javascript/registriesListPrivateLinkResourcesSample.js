// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the private link resources for a container registry.
 *
 * @summary lists the private link resources for a container registry.
 * x-ms-original-file: 2025-06-01-preview/RegistryListPrivateLinkResources.json
 */
async function registryListPrivateLinkResources() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.registries.listPrivateLinkResources(
    "myResourceGroup",
    "myRegistry",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await registryListPrivateLinkResources();
}

main().catch(console.error);
