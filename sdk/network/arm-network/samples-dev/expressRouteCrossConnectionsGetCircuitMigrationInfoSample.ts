// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets migration health information for an express route circuit cross connection.
 *
 * @summary gets migration health information for an express route circuit cross connection.
 * x-ms-original-file: 2026-01-01/ExpressRouteCrossConnectionGetCircuitMigrationInfo.json
 */
async function getExpressRouteCircuitMigrationInfo(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCrossConnections.getCircuitMigrationInfo(
    "CrossConnection-SiliconValley",
    "<circuitServiceKey>",
    {
      targetPeeringLocation: "SiliconValley",
      targetPortMapping: [
        { sourcePortId: "sourcePort1", targetPortId: "targetPort1" },
        { sourcePortId: "sourcePort2", targetPortId: "targetPort2" },
      ],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getExpressRouteCircuitMigrationInfo();
}

main().catch(console.error);
