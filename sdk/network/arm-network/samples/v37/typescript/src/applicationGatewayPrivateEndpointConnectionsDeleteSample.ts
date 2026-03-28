// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified private endpoint connection on application gateway.
 *
 * @summary deletes the specified private endpoint connection on application gateway.
 * x-ms-original-file: 2025-05-01/ApplicationGatewayPrivateEndpointConnectionDelete.json
 */
async function deleteApplicationGatewayPrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.applicationGatewayPrivateEndpointConnections.delete("rg1", "appgw", "connection1");
}

async function main(): Promise<void> {
  await deleteApplicationGatewayPrivateEndpointConnection();
}

main().catch(console.error);
