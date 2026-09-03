// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceNetworkingManagementClient } = require("@azure/arm-servicenetworking");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a PrivateEndpointConnection
 *
 * @summary delete a PrivateEndpointConnection
 * x-ms-original-file: 2026-03-01/PrivateEndpointConnectionDelete.json
 */
async function deletePrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  await client.privateEndpointConnectionsInterface.delete("rg1", "tc1", "pec1");
}

async function main() {
  await deletePrivateEndpointConnection();
}

main().catch(console.error);
