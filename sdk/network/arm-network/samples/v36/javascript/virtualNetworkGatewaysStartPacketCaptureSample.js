// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Starts packet capture on virtual network gateway in the specified resource group.
 *
 * @summary Starts packet capture on virtual network gateway in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkGatewayStartPacketCaptureFilterData.json
 */
async function startPacketCaptureOnVirtualNetworkGatewayWithFilter() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkGatewayName = "vpngw";
  const parameters = {
    filterData:
      "{'TracingFlags': 11,'MaxPacketBufferSize': 120,'MaxFileSize': 200,'Filters': [{'SourceSubnets': ['20.1.1.0/24'],'DestinationSubnets': ['10.1.1.0/24'],'SourcePort': [500],'DestinationPort': [4500],'Protocol': 6,'TcpFlags': 16,'CaptureSingleDirectionTrafficOnly': true}]}",
  };
  const options = {
    parameters,
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGateways.beginStartPacketCaptureAndWait(
    resourceGroupName,
    virtualNetworkGatewayName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Starts packet capture on virtual network gateway in the specified resource group.
 *
 * @summary Starts packet capture on virtual network gateway in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkGatewayStartPacketCapture.json
 */
async function startPacketCaptureOnVirtualNetworkGatewayWithoutFilter() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkGatewayName = "vpngw";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGateways.beginStartPacketCaptureAndWait(
    resourceGroupName,
    virtualNetworkGatewayName,
  );
  console.log(result);
}

async function main() {
  await startPacketCaptureOnVirtualNetworkGatewayWithFilter();
  await startPacketCaptureOnVirtualNetworkGatewayWithoutFilter();
}

main().catch(console.error);
