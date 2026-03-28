// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified authorization from the specified express route circuit.
 *
 * @summary deletes the specified authorization from the specified express route circuit.
 * x-ms-original-file: 2025-05-01/ExpressRouteCircuitAuthorizationDelete.json
 */
async function deleteExpressRouteCircuitAuthorization() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.expressRouteCircuitAuthorizations.delete("rg1", "circuitName", "authorizationName");
}

async function main() {
  await deleteExpressRouteCircuitAuthorization();
}

main().catch(console.error);
