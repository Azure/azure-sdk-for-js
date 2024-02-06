// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  VirtualNetworkGatewaysSupportedVpnDevicesParameters,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets a xml format representation for supported vpn devices.
 *
 * @summary Gets a xml format representation for supported vpn devices.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VirtualNetworkGatewaySupportedVpnDevice.json
 */
async function listVirtualNetworkGatewaySupportedVpnDevices() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualNetworkGatewayName = "vpngw";
  const options: VirtualNetworkGatewaysSupportedVpnDevicesParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/supportedvpndevices",
      subscriptionId,
      resourceGroupName,
      virtualNetworkGatewayName
    )
    .post(options);
  console.log(result);
}

listVirtualNetworkGatewaySupportedVpnDevices().catch(console.error);
