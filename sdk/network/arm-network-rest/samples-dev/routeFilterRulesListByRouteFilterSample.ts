// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { RouteFilterRulesListByRouteFilterParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { paginate } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets all RouteFilterRules in a route filter.
 *
 * @summary Gets all RouteFilterRules in a route filter.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/RouteFilterRuleListByRouteFilter.json
 */
async function routeFilterRuleListByRouteFilter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const routeFilterName = "filterName";
  const options: RouteFilterRulesListByRouteFilterParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/routeFilters/{routeFilterName}/routeFilterRules",
      subscriptionId,
      resourceGroupName,
      routeFilterName,
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

routeFilterRuleListByRouteFilter().catch(console.error);
