// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create and start a packet capture on the specified VM.
 *
 * @summary create and start a packet capture on the specified VM.
 * x-ms-original-file: 2025-05-01/NetworkWatcherPacketCaptureCreate.json
 */
async function createPacketCapture(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.packetCaptures.create("rg1", "nw1", "pc1", {
    bytesToCapturePerPacket: 10000,
    filters: [{ localIPAddress: "10.0.0.4", localPort: "80", protocol: "TCP" }],
    storageLocation: {
      filePath: "D:\\capture\\pc1.cap",
      storageId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg2/providers/Microsoft.Storage/storageAccounts/pcstore",
      storagePath: "https://mytestaccountname.blob.core.windows.net/capture/pc1.cap",
    },
    target:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg2/providers/Microsoft.Compute/virtualMachines/vm1",
    timeLimitInSeconds: 100,
    totalBytesPerSession: 100000,
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createPacketCapture();
}

main().catch(console.error);
