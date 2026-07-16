// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the route sets information for the ExpressRoute gateway.
 *
 * @summary retrieves the route sets information for the ExpressRoute gateway.
 * x-ms-original-file: 2025-07-01/ExpressRouteGatewayGetRoutesInformation.json
 */
async function expressRouteGatewayGetRoutesInformation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteGateways.getRoutesInformation("rg1", "ergw1", {
    attemptRefresh: false,
  });
  console.log(result);
}

async function main(): Promise<void> {
  await expressRouteGatewayGetRoutesInformation();
}

main().catch(console.error);
