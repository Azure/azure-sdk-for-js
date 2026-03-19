// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists all private endpoint connections on an application gateway.
 *
 * @summary Lists all private endpoint connections on an application gateway.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ApplicationGatewayPrivateEndpointConnectionList.json
 */
async function listsAllPrivateEndpointConnectionsOnApplicationGateway() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const applicationGatewayName = "appgw";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.applicationGatewayPrivateEndpointConnections.list(
    resourceGroupName,
    applicationGatewayName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listsAllPrivateEndpointConnectionsOnApplicationGateway();
}

main().catch(console.error);
