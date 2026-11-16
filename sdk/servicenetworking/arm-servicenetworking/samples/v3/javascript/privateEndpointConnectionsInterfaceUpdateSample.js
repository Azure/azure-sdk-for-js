// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceNetworkingManagementClient } = require("@azure/arm-servicenetworking");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a PrivateEndpointConnection
 *
 * @summary create a PrivateEndpointConnection
 * x-ms-original-file: 2026-03-01/PrivateEndpointConnectionPut.json
 */
async function updatePrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnectionsInterface.update("rg1", "tc1", "pec1", {
    properties: {
      privateLinkServiceConnectionState: { status: "Approved", description: "Approved by admin" },
    },
  });
  console.log(result);
}

async function main() {
  await updatePrivateEndpointConnection();
}

main().catch(console.error);
