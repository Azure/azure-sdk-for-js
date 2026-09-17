// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to prepares an express route circuit migration for a cross connection.
 *
 * @summary prepares an express route circuit migration for a cross connection.
 * x-ms-original-file: 2026-01-01/ExpressRouteCrossConnectionPrepareCircuitMigration.json
 */
async function prepareExpressRouteCircuitMigration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCrossConnections.prepareCircuitMigration(
    "CrossConnection-SiliconValley",
    "<circuitServiceKey>",
    {
      targetPeeringLocation: "SiliconValley",
      targetPortMapping: [
        { sourcePortId: "sourcePort1", targetPortId: "targetPort1" },
        { sourcePortId: "sourcePort2", targetPortId: "targetPort2" },
      ],
      portId: "sourcePort1",
    },
  );
  console.log(result);
}

async function main() {
  await prepareExpressRouteCircuitMigration();
}

main().catch(console.error);
