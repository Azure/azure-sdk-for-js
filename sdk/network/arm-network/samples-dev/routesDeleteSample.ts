// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified route from a route table.
 *
 * @summary deletes the specified route from a route table.
 * x-ms-original-file: 2025-05-01/RouteTableRouteDelete.json
 */
async function deleteRoute(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.routes.delete("rg1", "testrt", "route1");
}

async function main(): Promise<void> {
  await deleteRoute();
}

main().catch(console.error);
