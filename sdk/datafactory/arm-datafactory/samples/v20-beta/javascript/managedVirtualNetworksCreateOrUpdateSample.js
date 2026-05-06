// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a managed Virtual Network.
 *
 * @summary creates or updates a managed Virtual Network.
 * x-ms-original-file: 2018-06-01/ManagedVirtualNetworks_Create.json
 */
async function managedVirtualNetworksCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.managedVirtualNetworks.createOrUpdate(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleManagedVirtualNetworkName",
    { properties: {} },
  );
  console.log(result);
}

async function main() {
  await managedVirtualNetworksCreate();
}

main().catch(console.error);
