// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a managed private endpoint.
 *
 * @summary gets a managed private endpoint.
 * x-ms-original-file: 2018-06-01/ManagedPrivateEndpoints_Get.json
 */
async function managedPrivateEndpointsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.managedPrivateEndpoints.get(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleManagedVirtualNetworkName",
    "exampleManagedPrivateEndpointName",
  );
  console.log(result);
}

async function main() {
  await managedPrivateEndpointsGet();
}

main().catch(console.error);
