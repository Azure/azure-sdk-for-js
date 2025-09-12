// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PrivateEndpointConnection,
  ContainerRegistryManagementClient,
} from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update the state of specified private endpoint connection associated with the container registry.
 *
 * @summary Update the state of specified private endpoint connection associated with the container registry.
 * x-ms-original-file: specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/Registry/preview/2025-05-01-preview/examples/PrivateEndpointConnectionCreateOrUpdate.json
 */
async function privateEndpointConnectionCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERREGISTRY_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["CONTAINERREGISTRY_RESOURCE_GROUP"] || "myResourceGroup";
  const registryName = "myRegistry";
  const privateEndpointConnectionName = "myConnection";
  const privateEndpointConnection: PrivateEndpointConnection = {
    privateLinkServiceConnectionState: {
      description: "Auto-Approved",
      status: "Approved",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerRegistryManagementClient(
    credential,
    subscriptionId,
  );
  const result =
    await client.privateEndpointConnections.beginCreateOrUpdateAndWait(
      resourceGroupName,
      registryName,
      privateEndpointConnectionName,
      privateEndpointConnection,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await privateEndpointConnectionCreateOrUpdate();
}

main().catch(console.error);
