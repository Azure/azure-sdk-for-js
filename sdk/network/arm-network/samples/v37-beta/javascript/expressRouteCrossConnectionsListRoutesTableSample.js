// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the currently advertised routes table associated with the express route cross connection in a resource group.
 *
 * @summary gets the currently advertised routes table associated with the express route cross connection in a resource group.
 * x-ms-original-file: 2025-05-01/ExpressRouteCrossConnectionsRouteTable.json
 */
async function getExpressRouteCrossConnectionsRouteTable() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCrossConnections.listRoutesTable(
    "CrossConnection-SiliconValley",
    "<circuitServiceKey>",
    "AzurePrivatePeering",
    "primary",
  );
  console.log(result);
}

async function main() {
  await getExpressRouteCrossConnectionsRouteTable();
}

main().catch(console.error);
