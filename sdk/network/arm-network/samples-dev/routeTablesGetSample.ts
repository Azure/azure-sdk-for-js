// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified route table.
 *
 * @summary gets the specified route table.
 * x-ms-original-file: 2025-05-01/RouteTableGet.json
 */
async function getRouteTable(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.routeTables.get("rg1", "testrt");
  console.log(result);
}

async function main(): Promise<void> {
  await getRouteTable();
}

main().catch(console.error);
