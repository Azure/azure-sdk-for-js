// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createNetworkManagementClient = require("@azure-rest/arm-network").default,
  { getLongRunningPoller } = require("@azure-rest/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Updates the specified private endpoint connection on application gateway.
 *
 * @summary Updates the specified private endpoint connection on application gateway.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ApplicationGatewayPrivateEndpointConnectionUpdate.json
 */
async function updateApplicationGatewayPrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const applicationGatewayName = "appgw";
  const connectionName = "connection1";
  const options = {
    body: {
      name: "connection1",
      properties: {
        privateEndpoint: {
          id: "/subscriptions/subId2/resourceGroups/rg1/providers/Microsoft.Network/privateEndpoints/testPe",
        },
        privateLinkServiceConnectionState: {
          description: "approved it for some reason.",
          status: "Approved",
        },
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/applicationGateways/{applicationGatewayName}/privateEndpointConnections/{connectionName}",
      subscriptionId,
      resourceGroupName,
      applicationGatewayName,
      connectionName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

updateApplicationGatewayPrivateEndpointConnection().catch(console.error);
