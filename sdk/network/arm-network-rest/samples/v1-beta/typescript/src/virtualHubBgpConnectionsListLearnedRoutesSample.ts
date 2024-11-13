// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  VirtualHubBgpConnectionsListLearnedRoutesParameters,
  getLongRunningPoller
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Retrieves a list of routes the virtual hub bgp connection has learned.
 *
 * @summary Retrieves a list of routes the virtual hub bgp connection has learned.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VirtualRouterPeerListLearnedRoute.json
 */
async function virtualRouterPeerListLearnedRoutes() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const hubName = "virtualRouter1";
  const connectionName = "peer1";
  const options: VirtualHubBgpConnectionsListLearnedRoutesParameters = {
    queryParameters: { "api-version": "2022-05-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{hubName}/bgpConnections/{connectionName}/learnedRoutes",
      subscriptionId,
      resourceGroupName,
      hubName,
      connectionName
    )
    .post(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

virtualRouterPeerListLearnedRoutes().catch(console.error);
