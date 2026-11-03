// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists managed private endpoints.
 *
 * @summary lists managed private endpoints.
 * x-ms-original-file: 2018-06-01/ManagedPrivateEndpoints_ListByFactory.json
 */
async function managedPrivateEndpointsListByFactory() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedPrivateEndpoints.listByFactory(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleManagedVirtualNetworkName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await managedPrivateEndpointsListByFactory();
}

main().catch(console.error);
