// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  ExpressRouteConnectionsListParameters
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Lists ExpressRouteConnections.
 *
 * @summary Lists ExpressRouteConnections.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ExpressRouteConnectionList.json
 */
async function expressRouteConnectionList() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "resourceGroupName";
  const expressRouteGatewayName = "expressRouteGatewayName";
  const options: ExpressRouteConnectionsListParameters = {
    queryParameters: { "api-version": "2022-05-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteGateways/{expressRouteGatewayName}/expressRouteConnections",
      subscriptionId,
      resourceGroupName,
      expressRouteGatewayName
    )
    .get(options);
  console.log(result);
}

expressRouteConnectionList().catch(console.error);
