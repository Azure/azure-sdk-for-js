// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Starts packet capture on Vpn connection in the specified resource group.
 *
 * @summary Starts packet capture on Vpn connection in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VpnConnectionStartPacketCaptureFilterData.json
 */
async function startPacketCaptureOnVpnConnectionWithFilter() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const gatewayName = "gateway1";
  const vpnConnectionName = "vpnConnection1";
  const parameters = {
    filterData:
      "{'TracingFlags': 11,'MaxPacketBufferSize': 120,'MaxFileSize': 200,'Filters': [{'SourceSubnets': ['20.1.1.0/24'],'DestinationSubnets': ['10.1.1.0/24'],'SourcePort': [500],'DestinationPort': [4500],'Protocol': 6,'TcpFlags': 16,'CaptureSingleDirectionTrafficOnly': true}]}",
    linkConnectionNames: ["siteLink1", "siteLink2"],
  };
  const options = {
    parameters,
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.vpnConnections.beginStartPacketCaptureAndWait(
    resourceGroupName,
    gatewayName,
    vpnConnectionName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Starts packet capture on Vpn connection in the specified resource group.
 *
 * @summary Starts packet capture on Vpn connection in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VpnConnectionStartPacketCapture.json
 */
async function startPacketCaptureOnVpnConnectionWithoutFilter() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const gatewayName = "gateway1";
  const vpnConnectionName = "vpnConnection1";
  const parameters = {
    linkConnectionNames: ["siteLink1", "siteLink2"],
  };
  const options = {
    parameters,
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.vpnConnections.beginStartPacketCaptureAndWait(
    resourceGroupName,
    gatewayName,
    vpnConnectionName,
    options,
  );
  console.log(result);
}

async function main() {
  await startPacketCaptureOnVpnConnectionWithFilter();
  await startPacketCaptureOnVpnConnectionWithoutFilter();
}

main().catch(console.error);
