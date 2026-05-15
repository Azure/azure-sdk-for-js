// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists ExpressRoute gateways under a given subscription.
 *
 * @summary lists ExpressRoute gateways under a given subscription.
 * x-ms-original-file: 2025-05-01/ExpressRouteGatewayListBySubscription.json
 */
async function expressRouteGatewayListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteGateways.listBySubscription();
  console.log(result);
}

async function main(): Promise<void> {
  await expressRouteGatewayListBySubscription();
}

main().catch(console.error);
