// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified packet capture session.
 *
 * @summary deletes the specified packet capture session.
 * x-ms-original-file: 2025-05-01/NetworkWatcherPacketCaptureDelete.json
 */
async function deletePacketCapture() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.packetCaptures.delete("rg1", "nw1", "pc1");
}

async function main() {
  await deletePacketCapture();
}

main().catch(console.error);
