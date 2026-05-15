// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the backend health of the specified application gateway in a resource group.
 *
 * @summary gets the backend health of the specified application gateway in a resource group.
 * x-ms-original-file: 2025-05-01/ApplicationGatewayBackendHealthGet.json
 */
async function getBackendHealth(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.applicationGateways.backendHealth("appgw", "appgw");
  console.log(result);
}

async function main(): Promise<void> {
  await getBackendHealth();
}

main().catch(console.error);
