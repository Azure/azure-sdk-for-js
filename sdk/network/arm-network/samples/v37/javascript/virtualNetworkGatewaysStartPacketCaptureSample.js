// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to starts packet capture on virtual network gateway in the specified resource group.
 *
 * @summary starts packet capture on virtual network gateway in the specified resource group.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayStartPacketCapture.json
 */
async function startPacketCaptureOnVirtualNetworkGatewayWithoutFilter() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGateways.startPacketCapture("rg1", "vpngw");
  console.log(result);
}

/**
 * This sample demonstrates how to starts packet capture on virtual network gateway in the specified resource group.
 *
 * @summary starts packet capture on virtual network gateway in the specified resource group.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayStartPacketCaptureFilterData.json
 */
async function startPacketCaptureOnVirtualNetworkGatewayWithFilter() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGateways.startPacketCapture("rg1", "vpngw", {
    parameters: {
      filterData:
        "{'TracingFlags': 11,'MaxPacketBufferSize': 120,'MaxFileSize': 200,'Filters': [{'SourceSubnets': ['20.1.1.0/24'],'DestinationSubnets': ['10.1.1.0/24'],'SourcePort': [500],'DestinationPort': [4500],'Protocol': 6,'TcpFlags': 16,'CaptureSingleDirectionTrafficOnly': true}]}",
    },
  });
  console.log(result);
}

async function main() {
  await startPacketCaptureOnVirtualNetworkGatewayWithoutFilter();
  await startPacketCaptureOnVirtualNetworkGatewayWithFilter();
}

main().catch(console.error);
