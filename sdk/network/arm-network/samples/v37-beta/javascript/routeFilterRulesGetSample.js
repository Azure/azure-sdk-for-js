// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified rule from a route filter.
 *
 * @summary gets the specified rule from a route filter.
 * x-ms-original-file: 2025-05-01/RouteFilterRuleGet.json
 */
async function routeFilterRuleGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.routeFilterRules.get("rg1", "filterName", "filterName");
  console.log(result);
}

async function main() {
  await routeFilterRuleGet();
}

main().catch(console.error);
