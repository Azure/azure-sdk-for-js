// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified peering for the express route circuit.
 *
 * @summary gets the specified peering for the express route circuit.
 * x-ms-original-file: 2025-05-01/ExpressRouteCircuitPeeringGet.json
 */
async function getExpressRouteCircuitPeering() {
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

async function main() {
  await getExpressRouteCircuitPeering();
}

main().catch(console.error);
