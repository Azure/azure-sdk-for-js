// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates tags of a route filter.
 *
 * @summary updates tags of a route filter.
 * x-ms-original-file: 2025-05-01/RouteFilterUpdateTags.json
 */
async function updateRouteFilterTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.routeFilters.updateTags("rg1", "filterName", {
    tags: { key1: "value1" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateRouteFilterTags();
}

main().catch(console.error);
