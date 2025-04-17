// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ExpressRouteProviderPortsLocationListParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieves all the ExpressRouteProviderPorts in a subscription.
 *
 * @summary Retrieves all the ExpressRouteProviderPorts in a subscription.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/expressRouteProviderPortList.json
 */
async function expressRouteProviderPortList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const options: ExpressRouteProviderPortsLocationListParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Network/expressRouteProviderPorts",
      subscriptionId,
    )
    .get(options);
  console.log(result);
}

expressRouteProviderPortList().catch(console.error);
