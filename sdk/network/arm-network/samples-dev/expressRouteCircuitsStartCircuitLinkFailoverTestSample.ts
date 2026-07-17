// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to starts link failover simulation on the express route circuit for the specified link type and test category.
 *
 * @summary starts link failover simulation on the express route circuit for the specified link type and test category.
 * x-ms-original-file: 2025-07-01/ExpressRouteCircuitStartCircuitLinkFailoverTest.json
 */
async function expressRouteCircuitStartCircuitLinkFailoverTest(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCircuits.startCircuitLinkFailoverTest(
    "rg1",
    "circuit1",
    "Primary",
    "BgpDisconnect",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await expressRouteCircuitStartCircuitLinkFailoverTest();
}

main().catch(console.error);
