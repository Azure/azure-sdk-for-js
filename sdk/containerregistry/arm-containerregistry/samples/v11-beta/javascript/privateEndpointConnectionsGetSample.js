// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the specified private endpoint connection associated with the container registry.
 *
 * @summary get the specified private endpoint connection associated with the container registry.
 * x-ms-original-file: 2025-06-01-preview/PrivateEndpointConnectionGet.json
 */
async function privateEndpointConnectionGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    "myResourceGroup",
    "myRegistry",
    "myConnection",
  );
  console.log(result);
}

async function main() {
  await privateEndpointConnectionGet();
}

main().catch(console.error);
