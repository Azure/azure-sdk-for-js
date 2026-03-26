// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified peering for the express route circuit.
 *
 * @summary gets the specified peering for the express route circuit.
 * x-ms-original-file: 2025-05-01/ExpressRouteCircuitPeeringGet.json
 */
async function getExpressRouteCircuitPeering(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCircuitPeerings.get(
    "rg1",
    "circuitName",
    "MicrosoftPeering",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getExpressRouteCircuitPeering();
}

main().catch(console.error);
