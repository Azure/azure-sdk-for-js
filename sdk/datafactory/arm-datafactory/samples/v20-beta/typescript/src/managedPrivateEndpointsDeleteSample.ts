// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a managed private endpoint.
 *
 * @summary deletes a managed private endpoint.
 * x-ms-original-file: 2018-06-01/ManagedPrivateEndpoints_Delete.json
 */
async function managedVirtualNetworksDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  await client.managedPrivateEndpoints.delete(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleManagedVirtualNetworkName",
    "exampleManagedPrivateEndpointName",
  );
}

async function main(): Promise<void> {
  await managedVirtualNetworksDelete();
}

main().catch(console.error);
