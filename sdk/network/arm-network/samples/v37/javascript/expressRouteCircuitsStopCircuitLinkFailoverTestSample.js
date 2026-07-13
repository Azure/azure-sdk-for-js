// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to stops link failover simulation on the express route circuit.
 *
 * @summary stops link failover simulation on the express route circuit.
 * x-ms-original-file: 2025-07-01/ExpressRouteCircuitStopCircuitLinkFailoverTest.json
 */
async function expressRouteCircuitStopCircuitLinkFailoverTest() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCircuits.stopCircuitLinkFailoverTest("rg1", "circuit1", {
    stopParameters: {
      circuitTestCategory: "BgpDisconnect",
      linkType: "Primary",
      wasSimulationSuccessful: true,
      isVerified: true,
    },
  });
  console.log(result);
}

async function main() {
  await expressRouteCircuitStopCircuitLinkFailoverTest();
}

main().catch(console.error);
