// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the state of specified private endpoint connection associated with the container registry.
 *
 * @summary update the state of specified private endpoint connection associated with the container registry.
 * x-ms-original-file: 2025-05-01-preview/PrivateEndpointConnectionCreateOrUpdate.json
 */
async function privateEndpointConnectionCreateOrUpdate(): Promise<void> {
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

async function main(): Promise<void> {
  await privateEndpointConnectionCreateOrUpdate();
}

main().catch(console.error);
