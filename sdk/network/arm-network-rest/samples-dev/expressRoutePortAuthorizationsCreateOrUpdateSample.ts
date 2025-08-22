// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates an authorization in the specified express route port.
 *
 * @summary Creates or updates an authorization in the specified express route port.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ExpressRoutePortAuthorizationCreate.json
 */

import type { ExpressRoutePortAuthorizationsCreateOrUpdateParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createExpressRoutePortAuthorization(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const expressRoutePortName = "expressRoutePortName";
  const authorizationName = "authorizatinName";
  const options: ExpressRoutePortAuthorizationsCreateOrUpdateParameters = {
    body: { properties: {} },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRoutePorts/{expressRoutePortName}/authorizations/{authorizationName}",
      subscriptionId,
      resourceGroupName,
      expressRoutePortName,
      authorizationName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createExpressRoutePortAuthorization().catch(console.error);
