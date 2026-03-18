// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes the specified private endpoint connection on application gateway.
 *
 * @summary Deletes the specified private endpoint connection on application gateway.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ApplicationGatewayPrivateEndpointConnectionDelete.json
 */
async function deleteApplicationGatewayPrivateEndpointConnection(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const applicationGatewayName = "appgw";
  const connectionName = "connection1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.applicationGatewayPrivateEndpointConnections.beginDeleteAndWait(
      resourceGroupName,
      applicationGatewayName,
      connectionName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteApplicationGatewayPrivateEndpointConnection();
}

main().catch(console.error);
