// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The Set VpnclientIpsecParameters operation sets the vpnclient ipsec policy for P2S client of virtual network gateway in the specified resource group through Network resource provider.
 *
 * @summary The Set VpnclientIpsecParameters operation sets the vpnclient ipsec policy for P2S client of virtual network gateway in the specified resource group through Network resource provider.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VirtualNetworkGatewaySetVpnClientIpsecParameters.json
 */

import type { VirtualNetworkGatewaysSetVpnclientIpsecParametersParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function setVirtualNetworkGatewayVpnClientIpsecParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualNetworkGatewayName = "vpngw";
  const options: VirtualNetworkGatewaysSetVpnclientIpsecParametersParameters = {
    body: {
      dhGroup: "DHGroup2",
      ikeEncryption: "AES256",
      ikeIntegrity: "SHA384",
      ipsecEncryption: "AES256",
      ipsecIntegrity: "SHA256",
      pfsGroup: "PFS2",
      saDataSizeKilobytes: 429497,
      saLifeTimeSeconds: 86473,
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/setvpnclientipsecparameters",
      subscriptionId,
      resourceGroupName,
      virtualNetworkGatewayName,
    )
    .post(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

setVirtualNetworkGatewayVpnClientIpsecParameters().catch(console.error);
