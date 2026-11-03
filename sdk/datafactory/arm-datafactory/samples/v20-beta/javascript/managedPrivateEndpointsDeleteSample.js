// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a managed private endpoint.
 *
 * @summary deletes a managed private endpoint.
 * x-ms-original-file: 2018-06-01/ManagedPrivateEndpoints_Delete.json
 */
async function managedVirtualNetworksDelete() {
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

async function main() {
  await managedVirtualNetworksDelete();
}

main().catch(console.error);
