// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a managed Virtual Network.
 *
 * @summary gets a managed Virtual Network.
 * x-ms-original-file: 2018-06-01/ManagedVirtualNetworks_Get.json
 */
async function managedVirtualNetworksGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.managedVirtualNetworks.get(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleManagedVirtualNetworkName",
  );
  console.log(result);
}

async function main() {
  await managedVirtualNetworksGet();
}

main().catch(console.error);
