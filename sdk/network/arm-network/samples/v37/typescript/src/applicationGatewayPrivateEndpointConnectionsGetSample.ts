// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified private endpoint connection on application gateway.
 *
 * @summary gets the specified private endpoint connection on application gateway.
 * x-ms-original-file: 2025-05-01/ApplicationGatewayPrivateEndpointConnectionGet.json
 */
async function getApplicationGatewayPrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.applicationGatewayPrivateEndpointConnections.get(
    "rg1",
    "appgw",
    "connection1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getApplicationGatewayPrivateEndpointConnection();
}

main().catch(console.error);
