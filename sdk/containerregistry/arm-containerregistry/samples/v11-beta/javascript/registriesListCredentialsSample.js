// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the login credentials for the specified container registry.
 *
 * @summary lists the login credentials for the specified container registry.
 * x-ms-original-file: 2025-05-01-preview/RegistryListCredentials.json
 */
async function registryListCredentials() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.registries.listCredentials("myResourceGroup", "myRegistry");
  console.log(result);
}

async function main() {
  await registryListCredentials();
}

main().catch(console.error);
