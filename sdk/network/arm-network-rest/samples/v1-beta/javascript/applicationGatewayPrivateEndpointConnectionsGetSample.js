// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createNetworkManagementClient = require("@azure-rest/arm-network").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Gets the specified private endpoint connection on application gateway.
 *
 * @summary Gets the specified private endpoint connection on application gateway.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ApplicationGatewayPrivateEndpointConnectionGet.json
 */
async function getApplicationGatewayPrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const applicationGatewayName = "appgw";
  const connectionName = "connection1";
  const options = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/applicationGateways/{applicationGatewayName}/privateEndpointConnections/{connectionName}",
      subscriptionId,
      resourceGroupName,
      applicationGatewayName,
      connectionName
    )
    .get(options);
  console.log(result);
}

getApplicationGatewayPrivateEndpointConnection().catch(console.error);
