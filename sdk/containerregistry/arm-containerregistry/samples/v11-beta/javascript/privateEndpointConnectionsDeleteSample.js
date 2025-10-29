// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified private endpoint connection associated with the container registry.
 *
 * @summary deletes the specified private endpoint connection associated with the container registry.
 * x-ms-original-file: 2025-06-01-preview/PrivateEndpointConnectionDelete.json
 */
async function privateEndpointConnectionDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  await client.privateEndpointConnections.delete("myResourceGroup", "myRegistry", "myConnection");
}

async function main() {
  await privateEndpointConnectionDelete();
}

main().catch(console.error);
