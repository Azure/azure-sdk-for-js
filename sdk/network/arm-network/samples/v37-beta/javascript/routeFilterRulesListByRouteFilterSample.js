// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all RouteFilterRules in a route filter.
 *
 * @summary gets all RouteFilterRules in a route filter.
 * x-ms-original-file: 2025-05-01/RouteFilterRuleListByRouteFilter.json
 */
async function routeFilterRuleListByRouteFilter() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.routeFilterRules.listByRouteFilter("rg1", "filterName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await routeFilterRuleListByRouteFilter();
}

main().catch(console.error);
