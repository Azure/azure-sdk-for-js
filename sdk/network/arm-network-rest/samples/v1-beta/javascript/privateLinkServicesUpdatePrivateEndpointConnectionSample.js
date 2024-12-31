// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createNetworkManagementClient = require("@azure-rest/arm-network").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Approve or reject private end point connection for a private link service in a subscription.
 *
 * @summary Approve or reject private end point connection for a private link service in a subscription.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/PrivateLinkServiceUpdatePrivateEndpointConnection.json
 */
async function approveOrRejectPrivateEndPointConnectionForAPrivateLinkService() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const serviceName = "testPls";
  const peConnectionName = "testPlePeConnection";
  const options = {
    body: {
      name: "testPlePeConnection",
      properties: {
        privateEndpoint: {
          id: "/subscriptions/subId/resourceGroups/rg1/providers/Microsoft.Network/privateEndpoints/testPe",
        },
        privateLinkServiceConnectionState: {
          description: "approved it for some reason.",
          status: "Approved",
        },
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateLinkServices/{serviceName}/privateEndpointConnections/{peConnectionName}",
      subscriptionId,
      resourceGroupName,
      serviceName,
      peConnectionName
    )
    .put(options);
  console.log(result);
}

approveOrRejectPrivateEndPointConnectionForAPrivateLinkService().catch(console.error);
