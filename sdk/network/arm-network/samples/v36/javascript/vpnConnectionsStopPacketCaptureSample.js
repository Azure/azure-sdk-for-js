// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Stops packet capture on Vpn connection in the specified resource group.
 *
 * @summary Stops packet capture on Vpn connection in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VpnConnectionStopPacketCapture.json
 */
async function startPacketCaptureOnVpnConnectionWithoutFilter() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const gatewayName = "gateway1";
  const vpnConnectionName = "vpnConnection1";
  const parameters = {
    linkConnectionNames: ["vpnSiteLink1", "vpnSiteLink2"],
    sasUrl:
      "https://teststorage.blob.core.windows.net/?sv=2018-03-28&ss=bfqt&srt=sco&sp=rwdlacup&se=2019-09-13T07:44:05Z&st=2019-09-06T23:44:05Z&spr=https&sig=V1h9D1riltvZMI69d6ihENnFo%2FrCvTqGgjO2lf%2FVBhE%3D",
  };
  const options = { parameters };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.vpnConnections.beginStopPacketCaptureAndWait(
    resourceGroupName,
    gatewayName,
    vpnConnectionName,
    options,
  );
  console.log(result);
}

async function main() {
  await startPacketCaptureOnVpnConnectionWithoutFilter();
}

main().catch(console.error);
