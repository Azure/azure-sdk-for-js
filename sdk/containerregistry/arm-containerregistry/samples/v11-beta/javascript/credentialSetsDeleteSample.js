// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a credential set from a container registry.
 *
 * @summary deletes a credential set from a container registry.
 * x-ms-original-file: 2025-06-01-preview/CredentialSetDelete.json
 */
async function credentialSetDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  await client.credentialSets.delete("myResourceGroup", "myRegistry", "myCredentialSet");
}

async function main() {
  await credentialSetDelete();
}

main().catch(console.error);
