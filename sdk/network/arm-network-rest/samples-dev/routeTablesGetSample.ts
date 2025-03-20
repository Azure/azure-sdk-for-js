// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { RouteTablesGetParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the specified route table.
 *
 * @summary Gets the specified route table.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/RouteTableGet.json
 */
async function getRouteTable(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const routeTableName = "testrt";
  const options: RouteTablesGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/routeTables/{routeTableName}",
      subscriptionId,
      resourceGroupName,
      routeTableName,
    )
    .get(options);
  console.log(result);
}

getRouteTable().catch(console.error);
