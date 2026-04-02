// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a RouteMap.
 *
 * @summary deletes a RouteMap.
 * x-ms-original-file: 2025-05-01/RouteMapDelete.json
 */
async function routeMapDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.routeMaps.delete("rg1", "virtualHub1", "routeMap1");
}

async function main(): Promise<void> {
  await routeMapDelete();
}

main().catch(console.error);
