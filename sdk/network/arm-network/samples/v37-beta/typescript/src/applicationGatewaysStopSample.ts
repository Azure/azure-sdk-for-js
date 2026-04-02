// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to stops the specified application gateway in a resource group.
 *
 * @summary stops the specified application gateway in a resource group.
 * x-ms-original-file: 2025-05-01/ApplicationGatewayStop.json
 */
async function stopApplicationGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.applicationGateways.stop("rg1", "appgw");
}

async function main(): Promise<void> {
  await stopApplicationGateway();
}

main().catch(console.error);
