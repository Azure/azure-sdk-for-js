// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to stops packet capture on virtual network gateway in the specified resource group.
 *
 * @summary stops packet capture on virtual network gateway in the specified resource group.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayStopPacketCapture.json
 */
async function stopPacketCaptureOnVirtualNetworkGateway() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGateways.stopPacketCapture("rg1", "vpngw", {
    sasUrl:
      "https://teststorage.blob.core.windows.net/?sv=2018-03-28&ss=bfqt&srt=sco&sp=rwdlacup&se=2019-09-13T07:44:05Z&st=2019-09-06T23:44:05Z&spr=https&sig=V1h9D1riltvZMI69d6ihENnFo%2FrCvTqGgjO2lf%2FVBhE%3D",
  });
  console.log(result);
}

async function main() {
  await stopPacketCaptureOnVirtualNetworkGateway();
}

main().catch(console.error);
