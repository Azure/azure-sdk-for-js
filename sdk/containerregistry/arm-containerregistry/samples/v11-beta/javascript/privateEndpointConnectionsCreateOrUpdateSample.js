// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the state of specified private endpoint connection associated with the container registry.
 *
 * @summary update the state of specified private endpoint connection associated with the container registry.
 * x-ms-original-file: 2025-05-01-preview/PrivateEndpointConnectionCreateOrUpdate.json
 */
async function privateEndpointConnectionCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.createOrUpdate(
    "myResourceGroup",
    "myRegistry",
    "myConnection",
    {
      properties: {
        privateLinkServiceConnectionState: {
          description: "Auto-Approved",
          status: "Approved",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await privateEndpointConnectionCreateOrUpdate();
}

main().catch(console.error);
