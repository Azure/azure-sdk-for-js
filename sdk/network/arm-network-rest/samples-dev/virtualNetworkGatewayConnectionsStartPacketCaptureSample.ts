// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Starts packet capture on virtual network gateway connection in the specified resource group.
 *
 * @summary Starts packet capture on virtual network gateway connection in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VirtualNetworkGatewayConnectionStartPacketCaptureFilterData.json
 */

import type { VirtualNetworkGatewayConnectionsStartPacketCaptureParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function startPacketCaptureOnVirtualNetworkGatewayConnectionWithFilter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualNetworkGatewayConnectionName = "vpngwcn1";
  const options: VirtualNetworkGatewayConnectionsStartPacketCaptureParameters = {
    body: {
      filterData:
        "{'TracingFlags': 11,'MaxPacketBufferSize': 120,'MaxFileSize': 200,'Filters': [{'SourceSubnets': ['20.1.1.0/24'],'DestinationSubnets': ['10.1.1.0/24'],'SourcePort': [500],'DestinationPort': [4500],'Protocol': 6,'TcpFlags': 16,'CaptureSingleDirectionTrafficOnly': true}]}",
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections/{virtualNetworkGatewayConnectionName}/startPacketCapture",
      subscriptionId,
      resourceGroupName,
      virtualNetworkGatewayConnectionName,
    )
    .post(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

startPacketCaptureOnVirtualNetworkGatewayConnectionWithFilter().catch(console.error);
/**
 * This sample demonstrates how to Starts packet capture on virtual network gateway connection in the specified resource group.
 *
 * @summary Starts packet capture on virtual network gateway connection in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VirtualNetworkGatewayConnectionStartPacketCapture.json
 */
async function startPacketCaptureOnVirtualNetworkGatewayConnectionWithoutFilter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualNetworkGatewayConnectionName = "vpngwcn1";
  const options: VirtualNetworkGatewayConnectionsStartPacketCaptureParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections/{virtualNetworkGatewayConnectionName}/startPacketCapture",
      subscriptionId,
      resourceGroupName,
      virtualNetworkGatewayConnectionName,
    )
    .post(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

startPacketCaptureOnVirtualNetworkGatewayConnectionWithoutFilter().catch(console.error);
