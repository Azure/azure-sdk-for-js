// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  RouteFiltersUpdateTagsParameters,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Updates tags of a route filter.
 *
 * @summary Updates tags of a route filter.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/RouteFilterUpdateTags.json
 */
async function updateRouteFilterTags() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const routeFilterName = "filterName";
  const options: RouteFiltersUpdateTagsParameters = {
    body: { tags: { key1: "value1" } },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/routeFilters/{routeFilterName}",
      subscriptionId,
      resourceGroupName,
      routeFilterName,
    )
    .patch(options);
  console.log(result);
}

updateRouteFilterTags().catch(console.error);
