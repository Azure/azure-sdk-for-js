// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ExpressRouteConnectionsGetParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the specified ExpressRouteConnection.
 *
 * @summary Gets the specified ExpressRouteConnection.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ExpressRouteConnectionGet.json
 */
async function expressRouteConnectionGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "resourceGroupName";
  const expressRouteGatewayName = "expressRouteGatewayName";
  const connectionName = "connectionName";
  const options: ExpressRouteConnectionsGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteGateways/{expressRouteGatewayName}/expressRouteConnections/{connectionName}",
      subscriptionId,
      resourceGroupName,
      expressRouteGatewayName,
      connectionName,
    )
    .get(options);
  console.log(result);
}

expressRouteConnectionGet().catch(console.error);
