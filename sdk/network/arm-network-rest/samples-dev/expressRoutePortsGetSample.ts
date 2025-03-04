// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ExpressRoutePortsGetParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieves the requested ExpressRoutePort resource.
 *
 * @summary Retrieves the requested ExpressRoutePort resource.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ExpressRoutePortGet.json
 */
async function expressRoutePortGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const expressRoutePortName = "portName";
  const options: ExpressRoutePortsGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/ExpressRoutePorts/{expressRoutePortName}",
      subscriptionId,
      resourceGroupName,
      expressRoutePortName,
    )
    .get(options);
  console.log(result);
}

expressRoutePortGet().catch(console.error);
