// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the quota usages for the specified container registry.
 *
 * @summary gets the quota usages for the specified container registry.
 * x-ms-original-file: 2025-06-01-preview/RegistryListUsages.json
 */
async function registryListUsages() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.registries.listUsages("myResourceGroup", "myRegistry");
  console.log(result);
}

async function main() {
  await registryListUsages();
}

main().catch(console.error);
