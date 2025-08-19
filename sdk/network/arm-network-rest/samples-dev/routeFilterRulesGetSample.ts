// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the specified rule from a route filter.
 *
 * @summary Gets the specified rule from a route filter.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/RouteFilterRuleGet.json
 */

import type { RouteFilterRulesGetParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function routeFilterRuleGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const routeFilterName = "filterName";
  const ruleName = "filterName";
  const options: RouteFilterRulesGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/routeFilters/{routeFilterName}/routeFilterRules/{ruleName}",
      subscriptionId,
      resourceGroupName,
      routeFilterName,
      ruleName,
    )
    .get(options);
  console.log(result);
}

routeFilterRuleGet().catch(console.error);
