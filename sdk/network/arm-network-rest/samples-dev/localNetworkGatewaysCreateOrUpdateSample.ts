// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a local network gateway in the specified resource group.
 *
 * @summary Creates or updates a local network gateway in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/LocalNetworkGatewayCreate.json
 */

import type { LocalNetworkGatewaysCreateOrUpdateParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createLocalNetworkGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const localNetworkGatewayName = "localgw";
  const options: LocalNetworkGatewaysCreateOrUpdateParameters = {
    body: {
      location: "Central US",
      properties: {
        fqdn: "site1.contoso.com",
        gatewayIpAddress: "11.12.13.14",
        localNetworkAddressSpace: { addressPrefixes: ["10.1.0.0/16"] },
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/localNetworkGateways/{localNetworkGatewayName}",
      subscriptionId,
      resourceGroupName,
      localNetworkGatewayName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createLocalNetworkGateway().catch(console.error);
