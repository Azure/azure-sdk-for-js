// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { RoutesGetParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the specified route from a route table.
 *
 * @summary Gets the specified route from a route table.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/RouteTableRouteGet.json
 */
async function getRoute(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const routeTableName = "testrt";
  const routeName = "route1";
  const options: RoutesGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/routeTables/{routeTableName}/routes/{routeName}",
      subscriptionId,
      resourceGroupName,
      routeTableName,
      routeName,
    )
    .get(options);
  console.log(result);
}

getRoute().catch(console.error);
