// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an authorization in the specified express route circuit.
 *
 * @summary creates or updates an authorization in the specified express route circuit.
 * x-ms-original-file: 2025-05-01/ExpressRouteCircuitAuthorizationCreate.json
 */
async function createExpressRouteCircuitAuthorization(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCircuitAuthorizations.createOrUpdate(
    "rg1",
    "circuitName",
    "authorizatinName",
    {},
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createExpressRouteCircuitAuthorization();
}

main().catch(console.error);
