// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  VirtualNetworkGatewaysVpnDeviceConfigurationScriptParameters,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets a xml format representation for vpn device configuration script.
 *
 * @summary Gets a xml format representation for vpn device configuration script.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VirtualNetworkGatewayVpnDeviceConfigurationScript.json
 */
async function getVpnDeviceConfigurationScript() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualNetworkGatewayConnectionName = "vpngw";
  const options: VirtualNetworkGatewaysVpnDeviceConfigurationScriptParameters = {
    body: {
      deviceFamily: "ISR",
      firmwareVersion: "IOS 15.1 (Preview)",
      vendor: "Cisco",
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections/{virtualNetworkGatewayConnectionName}/vpndeviceconfigurationscript",
      subscriptionId,
      resourceGroupName,
      virtualNetworkGatewayConnectionName,
    )
    .post(options);
  console.log(result);
}

getVpnDeviceConfigurationScript().catch(console.error);
