// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified application gateway.
 *
 * @summary gets the specified application gateway.
 * x-ms-original-file: 2025-05-01/ApplicationGatewayGet.json
 */
async function getApplicationGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.applicationGateways.get("rg1", "appgw");
  console.log(result);
}

async function main(): Promise<void> {
  await getApplicationGateway();
}

main().catch(console.error);
