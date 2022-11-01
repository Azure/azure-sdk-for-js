// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  LocalNetworkGatewaysCreateOrUpdateParameters,
  getLongRunningPoller
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Creates or updates a local network gateway in the specified resource group.
 *
 * @summary Creates or updates a local network gateway in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/LocalNetworkGatewayCreate.json
 */
async function createLocalNetworkGateway() {
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
        localNetworkAddressSpace: { addressPrefixes: ["10.1.0.0/16"] }
      }
    },
    queryParameters: { "api-version": "2022-05-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/localNetworkGateways/{localNetworkGatewayName}",
      subscriptionId,
      resourceGroupName,
      localNetworkGatewayName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createLocalNetworkGateway().catch(console.error);
