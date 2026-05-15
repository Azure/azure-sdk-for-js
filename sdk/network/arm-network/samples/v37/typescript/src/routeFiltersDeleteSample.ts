// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified route filter.
 *
 * @summary deletes the specified route filter.
 * x-ms-original-file: 2025-05-01/RouteFilterDelete.json
 */
async function routeFilterDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.routeFilters.delete("rg1", "filterName");
}

async function main(): Promise<void> {
  await routeFilterDelete();
}

main().catch(console.error);
