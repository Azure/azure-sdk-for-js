// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all authorizations in an express route circuit.
 *
 * @summary gets all authorizations in an express route circuit.
 * x-ms-original-file: 2025-05-01/ExpressRouteCircuitAuthorizationList.json
 */
async function listExpressRouteCircuitAuthorization(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.expressRouteCircuitAuthorizations.list("rg1", "circuitName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listExpressRouteCircuitAuthorization();
}

main().catch(console.error);
