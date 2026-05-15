// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the currently advertised ARP table associated with the express route circuit in a resource group.
 *
 * @summary gets the currently advertised ARP table associated with the express route circuit in a resource group.
 * x-ms-original-file: 2025-05-01/ExpressRouteCircuitARPTableList.json
 */
async function listARPTable() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCircuits.listArpTable(
    "rg1",
    "circuitName",
    "peeringName",
    "devicePath",
  );
  console.log(result);
}

async function main() {
  await listARPTable();
}

main().catch(console.error);
