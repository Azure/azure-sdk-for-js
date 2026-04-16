// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Stops packet capture on virtual network gateway connection in the specified resource group.
 *
 * @summary Stops packet capture on virtual network gateway connection in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkGatewayConnectionStopPacketCapture.json
 */
async function stopPacketCaptureOnVirtualNetworkGatewayConnection() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkGatewayConnectionName = "vpngwcn1";
  const parameters = {
    sasUrl:
      "https://teststorage.blob.core.windows.net/?sv=2018-03-28&ss=bfqt&srt=sco&sp=rwdlacup&se=2019-09-13T07:44:05Z&st=2019-09-06T23:44:05Z&spr=https&sig=V1h9D1riltvZMI69d6ihENnFo%2FrCvTqGgjO2lf%2FVBhE%3D",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGatewayConnections.beginStopPacketCaptureAndWait(
    resourceGroupName,
    virtualNetworkGatewayConnectionName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await stopPacketCaptureOnVirtualNetworkGatewayConnection();
}

main().catch(console.error);
