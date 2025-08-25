// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create and start a packet capture on the specified VM.
 *
 * @summary Create and start a packet capture on the specified VM.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkWatcherPacketCaptureCreate.json
 */

import type { PacketCapturesCreateParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createPacketCapture(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const networkWatcherName = "nw1";
  const packetCaptureName = "pc1";
  const options: PacketCapturesCreateParameters = {
    body: {
      properties: {
        bytesToCapturePerPacket: 10000,
        filters: [{ localIPAddress: "10.0.0.4", localPort: "80", protocol: "TCP" }],
        storageLocation: {
          filePath: "D:capturepc1.cap",
          storageId:
            "/subscriptions/subid/resourceGroups/rg2/providers/Microsoft.Storage/storageAccounts/pcstore",
          storagePath: "https://mytestaccountname.blob.core.windows.net/capture/pc1.cap",
        },
        target:
          "/subscriptions/subid/resourceGroups/rg2/providers/Microsoft.Compute/virtualMachines/vm1",
        timeLimitInSeconds: 100,
        totalBytesPerSession: 100000,
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/packetCaptures/{packetCaptureName}",
      subscriptionId,
      resourceGroupName,
      networkWatcherName,
      packetCaptureName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createPacketCapture().catch(console.error);
