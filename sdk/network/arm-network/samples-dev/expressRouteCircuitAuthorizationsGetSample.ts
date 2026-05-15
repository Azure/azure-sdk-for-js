// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified authorization from the specified express route circuit.
 *
 * @summary gets the specified authorization from the specified express route circuit.
 * x-ms-original-file: 2025-05-01/ExpressRouteCircuitAuthorizationGet.json
 */
async function getExpressRouteCircuitAuthorization(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCircuitAuthorizations.get(
    "rg1",
    "circuitName",
    "authorizationName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getExpressRouteCircuitAuthorization();
}

main().catch(console.error);
