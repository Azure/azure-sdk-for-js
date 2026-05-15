// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified route table.
 *
 * @summary deletes the specified route table.
 * x-ms-original-file: 2025-05-01/RouteTableDelete.json
 */
async function deleteRouteTable(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.routeTables.delete("rg1", "testrt");
}

async function main(): Promise<void> {
  await deleteRouteTable();
}

main().catch(console.error);
