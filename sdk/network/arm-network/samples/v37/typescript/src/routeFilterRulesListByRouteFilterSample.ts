// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all RouteFilterRules in a route filter.
 *
 * @summary gets all RouteFilterRules in a route filter.
 * x-ms-original-file: 2025-05-01/RouteFilterRuleListByRouteFilter.json
 */
async function routeFilterRuleListByRouteFilter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.routeFilterRules.listByRouteFilter("rg1", "filterName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await routeFilterRuleListByRouteFilter();
}

main().catch(console.error);
