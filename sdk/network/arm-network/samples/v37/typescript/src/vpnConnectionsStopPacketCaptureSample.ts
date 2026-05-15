// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to stops packet capture on Vpn connection in the specified resource group.
 *
 * @summary stops packet capture on Vpn connection in the specified resource group.
 * x-ms-original-file: 2025-05-01/VpnConnectionStopPacketCapture.json
 */
async function startPacketCaptureOnVpnConnectionWithoutFilter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.vpnConnections.stopPacketCapture(
    "rg1",
    "gateway1",
    "vpnConnection1",
    {
      parameters: {
        linkConnectionNames: ["vpnSiteLink1", "vpnSiteLink2"],
        sasUrl:
          "https://teststorage.blob.core.windows.net/?sv=2018-03-28&ss=bfqt&srt=sco&sp=rwdlacup&se=2019-09-13T07:44:05Z&st=2019-09-06T23:44:05Z&spr=https&sig=V1h9D1riltvZMI69d6ihENnFo%2FrCvTqGgjO2lf%2FVBhE%3D",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await startPacketCaptureOnVpnConnectionWithoutFilter();
}

main().catch(console.error);
