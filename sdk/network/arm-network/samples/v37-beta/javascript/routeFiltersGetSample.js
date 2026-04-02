// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified route filter.
 *
 * @summary gets the specified route filter.
 * x-ms-original-file: 2025-05-01/RouteFilterGet.json
 */
async function routeFilterGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.routeFilters.get("rg1", "filterName");
  console.log(result);
}

async function main() {
  await routeFilterGet();
}

main().catch(console.error);
