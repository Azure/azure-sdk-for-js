// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to stops a specified packet capture session.
 *
 * @summary stops a specified packet capture session.
 * x-ms-original-file: 2025-05-01/NetworkWatcherPacketCaptureStop.json
 */
async function stopPacketCapture(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.packetCaptures.stop("rg1", "nw1", "pc1");
}

async function main(): Promise<void> {
  await stopPacketCapture();
}

main().catch(console.error);
