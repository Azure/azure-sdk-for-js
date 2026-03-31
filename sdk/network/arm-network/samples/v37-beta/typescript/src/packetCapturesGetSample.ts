// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a packet capture session by name.
 *
 * @summary gets a packet capture session by name.
 * x-ms-original-file: 2025-05-01/NetworkWatcherPacketCaptureGet.json
 */
async function getPacketCapture(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.packetCaptures.get("rg1", "nw1", "pc1");
  console.log(result);
}

async function main(): Promise<void> {
  await getPacketCapture();
}

main().catch(console.error);
