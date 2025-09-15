// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a token from a container registry.
 *
 * @summary deletes a token from a container registry.
 * x-ms-original-file: 2025-05-01-preview/TokenDelete.json
 */
async function tokenDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  await client.tokens.delete("myResourceGroup", "myRegistry", "myToken");
}

async function main() {
  await tokenDelete();
}

main().catch(console.error);
