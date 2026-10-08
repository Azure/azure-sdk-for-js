// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to commits the express route circuit migration for a cross connection.
 *
 * @summary commits the express route circuit migration for a cross connection.
 * x-ms-original-file: 2026-01-01/ExpressRouteCrossConnectionCommitCircuitMigration.json
 */
async function commitExpressRouteCircuitMigration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCrossConnections.commitCircuitMigration(
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

async function main(): Promise<void> {
  await commitExpressRouteCircuitMigration();
}

main().catch(console.error);
