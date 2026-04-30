// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Deletes the specified private endpoint connection on application gateway.
 *
 * @summary Deletes the specified private endpoint connection on application gateway.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ApplicationGatewayPrivateEndpointConnectionDelete.json
 */
async function deleteApplicationGatewayPrivateEndpointConnection() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const applicationGatewayName = "appgw";
  const connectionName = "connection1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.applicationGatewayPrivateEndpointConnections.beginDeleteAndWait(
    resourceGroupName,
    applicationGatewayName,
    connectionName,
  );
  console.log(result);
}

async function main() {
  await deleteApplicationGatewayPrivateEndpointConnection();
}

main().catch(console.error);
