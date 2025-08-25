// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a route filter in a specified resource group.
 *
 * @summary Creates or updates a route filter in a specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/RouteFilterCreate.json
 */

import type { RouteFiltersCreateOrUpdateParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function routeFilterCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const routeFilterName = "filterName";
  const options: RouteFiltersCreateOrUpdateParameters = {
    body: {
      location: "West US",
      properties: {
        rules: [
          {
            name: "ruleName",
            properties: {
              access: "Allow",
              communities: ["12076:5030", "12076:5040"],
              routeFilterRuleType: "Community",
            },
          },
        ],
      },
      tags: { key1: "value1" },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/routeFilters/{routeFilterName}",
      subscriptionId,
      resourceGroupName,
      routeFilterName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

routeFilterCreate().catch(console.error);
