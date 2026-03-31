// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the currently advertised routes table summary associated with the express route circuit in a resource group.
 *
 * @summary gets the currently advertised routes table summary associated with the express route circuit in a resource group.
 * x-ms-original-file: 2025-05-01/ExpressRouteCircuitRouteTableSummaryList.json
 */
async function listRouteTableSummary() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCircuits.listRoutesTableSummary(
    "rg1",
    "circuitName",
    "peeringName",
    "devicePath",
  );
  console.log(result);
}

async function main() {
  await listRouteTableSummary();
}

main().catch(console.error);
