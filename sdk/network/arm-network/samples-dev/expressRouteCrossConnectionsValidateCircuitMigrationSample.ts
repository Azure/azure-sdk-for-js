// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to validates express route circuit migration for a cross connection.
 *
 * @summary validates express route circuit migration for a cross connection.
 * x-ms-original-file: 2026-01-01/ExpressRouteCrossConnectionValidateCircuitMigration.json
 */
async function validateExpressRouteCircuitMigration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCrossConnections.validateCircuitMigration(
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
  await validateExpressRouteCircuitMigration();
}

main().catch(console.error);
