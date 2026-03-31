// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates tags of a route filter.
 *
 * @summary updates tags of a route filter.
 * x-ms-original-file: 2025-05-01/RouteFilterUpdateTags.json
 */
async function updateRouteFilterTags() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.routeFilters.updateTags("rg1", "filterName", {
    tags: { key1: "value1" },
  });
  console.log(result);
}

async function main() {
  await updateRouteFilterTags();
}

main().catch(console.error);
