// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the specified private endpoint connection on application gateway.
 *
 * @summary updates the specified private endpoint connection on application gateway.
 * x-ms-original-file: 2025-05-01/ApplicationGatewayPrivateEndpointConnectionUpdate.json
 */
async function updateApplicationGatewayPrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.applicationGatewayPrivateEndpointConnections.update(
    "rg1",
    "appgw",
    "connection1",
    {
      privateLinkServiceConnectionState: {
        description: "approved it for some reason.",
        status: "Approved",
      },
    },
  );
  console.log(result);
}

async function main() {
  await updateApplicationGatewayPrivateEndpointConnection();
}

main().catch(console.error);
