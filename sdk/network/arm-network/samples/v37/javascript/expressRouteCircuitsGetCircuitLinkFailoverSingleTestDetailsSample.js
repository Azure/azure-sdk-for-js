// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the details of a particular link failover test performed on the express route circuit.
 *
 * @summary retrieves the details of a particular link failover test performed on the express route circuit.
 * x-ms-original-file: 2025-07-01/ExpressRouteCircuitGetCircuitLinkFailoverSingleTestDetails.json
 */
async function expressRouteCircuitGetCircuitLinkFailoverSingleTestDetails() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCircuits.getCircuitLinkFailoverSingleTestDetails(
    "rg1",
    "circuit1",
    "Primary",
    "BgpDisconnect",
    "00000000-0000-0000-0000-000000000001",
  );
  console.log(result);
}

async function main() {
  await expressRouteCircuitGetCircuitLinkFailoverSingleTestDetails();
}

main().catch(console.error);
