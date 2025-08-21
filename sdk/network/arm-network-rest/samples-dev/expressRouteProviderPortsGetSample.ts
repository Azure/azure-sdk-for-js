// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Retrieves detail of a provider port.
 *
 * @summary Retrieves detail of a provider port.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/expressRouteProviderPort.json
 */

import type { ExpressRouteProviderPortParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function expressRouteProviderPort(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const providerport = "abc";
  const options: ExpressRouteProviderPortParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Network/expressRouteProviderPorts/{providerport}",
      subscriptionId,
      providerport,
    )
    .get(options);
  console.log(result);
}

expressRouteProviderPort().catch(console.error);
