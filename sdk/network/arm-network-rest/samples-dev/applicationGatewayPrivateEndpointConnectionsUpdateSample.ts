// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ApplicationGatewayPrivateEndpointConnectionsUpdateParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates the specified private endpoint connection on application gateway.
 *
 * @summary Updates the specified private endpoint connection on application gateway.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ApplicationGatewayPrivateEndpointConnectionUpdate.json
 */
async function updateApplicationGatewayPrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const applicationGatewayName = "appgw";
  const connectionName = "connection1";
  const options: ApplicationGatewayPrivateEndpointConnectionsUpdateParameters = {
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
      connectionName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

updateApplicationGatewayPrivateEndpointConnection().catch(console.error);
