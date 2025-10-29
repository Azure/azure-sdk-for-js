// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all private endpoint connections in a container registry.
 *
 * @summary list all private endpoint connections in a container registry.
 * x-ms-original-file: 2025-06-01-preview/PrivateEndpointConnectionList.json
 */
async function privateEndpointConnectionList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.list(
    "myResourceGroup",
    "myRegistry",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await privateEndpointConnectionList();
}

main().catch(console.error);
