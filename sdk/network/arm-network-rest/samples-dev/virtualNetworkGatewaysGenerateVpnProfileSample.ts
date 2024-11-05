// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  VirtualNetworkGatewaysGenerateVpnProfileParameters,
  getLongRunningPoller,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Generates VPN profile for P2S client of the virtual network gateway in the specified resource group. Used for IKEV2 and radius based authentication.
 *
 * @summary Generates VPN profile for P2S client of the virtual network gateway in the specified resource group. Used for IKEV2 and radius based authentication.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VirtualNetworkGatewayGenerateVpnProfile.json
 */
async function generateVirtualNetworkGatewayVpnProfile() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualNetworkGatewayName = "vpngw";
  const options: VirtualNetworkGatewaysGenerateVpnProfileParameters = {
    body: {},
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/generatevpnprofile",
      subscriptionId,
      resourceGroupName,
      virtualNetworkGatewayName,
    )
    .post(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

generateVirtualNetworkGatewayVpnProfile().catch(console.error);
