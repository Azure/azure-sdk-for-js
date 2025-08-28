// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes a RouteMap.
 *
 * @summary Deletes a RouteMap.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/RouteMapDelete.json
 */

import type { RouteMapsDeleteParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function routeMapDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualHubName = "virtualHub1";
  const routeMapName = "routeMap1";
  const options: RouteMapsDeleteParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/routeMaps/{routeMapName}",
      subscriptionId,
      resourceGroupName,
      virtualHubName,
      routeMapName,
    )
    .delete(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

routeMapDelete().catch(console.error);
