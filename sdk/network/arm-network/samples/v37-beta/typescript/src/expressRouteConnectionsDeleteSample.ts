// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a connection to a ExpressRoute circuit.
 *
 * @summary deletes a connection to a ExpressRoute circuit.
 * x-ms-original-file: 2025-05-01/ExpressRouteConnectionDelete.json
 */
async function expressRouteConnectionDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.expressRouteConnections.delete(
    "resourceGroupName",
    "expressRouteGatewayName",
    "connectionName",
  );
}

async function main(): Promise<void> {
  await expressRouteConnectionDelete();
}

main().catch(console.error);
