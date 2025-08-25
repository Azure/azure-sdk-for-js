// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Starts packet capture on Vpn connection in the specified resource group.
 *
 * @summary Starts packet capture on Vpn connection in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VpnConnectionStartPacketCaptureFilterData.json
 */

import type { VpnConnectionsStartPacketCaptureParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function startPacketCaptureOnVpnConnectionWithFilter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const gatewayName = "gateway1";
  const vpnConnectionName = "vpnConnection1";
  const options: VpnConnectionsStartPacketCaptureParameters = {
    body: {
      filterData:
        "{'TracingFlags': 11,'MaxPacketBufferSize': 120,'MaxFileSize': 200,'Filters': [{'SourceSubnets': ['20.1.1.0/24'],'DestinationSubnets': ['10.1.1.0/24'],'SourcePort': [500],'DestinationPort': [4500],'Protocol': 6,'TcpFlags': 16,'CaptureSingleDirectionTrafficOnly': true}]}",
      linkConnectionNames: ["siteLink1", "siteLink2"],
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/vpnConnections/{vpnConnectionName}/startpacketcapture",
      subscriptionId,
      resourceGroupName,
      gatewayName,
      vpnConnectionName,
    )
    .post(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

startPacketCaptureOnVpnConnectionWithFilter().catch(console.error);
/**
 * This sample demonstrates how to Starts packet capture on Vpn connection in the specified resource group.
 *
 * @summary Starts packet capture on Vpn connection in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VpnConnectionStartPacketCapture.json
 */
async function startPacketCaptureOnVpnConnectionWithoutFilter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const gatewayName = "gateway1";
  const vpnConnectionName = "vpnConnection1";
  const options: VpnConnectionsStartPacketCaptureParameters = {
    body: { linkConnectionNames: ["siteLink1", "siteLink2"] },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/vpnConnections/{vpnConnectionName}/startpacketcapture",
      subscriptionId,
      resourceGroupName,
      gatewayName,
      vpnConnectionName,
    )
    .post(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

startPacketCaptureOnVpnConnectionWithoutFilter().catch(console.error);
