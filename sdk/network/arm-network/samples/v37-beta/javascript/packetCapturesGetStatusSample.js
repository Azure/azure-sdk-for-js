// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to query the status of a running packet capture session.
 *
 * @summary query the status of a running packet capture session.
 * x-ms-original-file: 2025-05-01/NetworkWatcherPacketCaptureQueryStatus.json
 */
async function queryPacketCaptureStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.packetCaptures.getStatus("rg1", "nw1", "pc1");
  console.log(result);
}

async function main() {
  await queryPacketCaptureStatus();
}

main().catch(console.error);
