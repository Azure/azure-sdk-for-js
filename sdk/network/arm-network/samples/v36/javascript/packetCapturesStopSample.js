// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Stops a specified packet capture session.
 *
 * @summary Stops a specified packet capture session.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkWatcherPacketCaptureStop.json
 */
async function stopPacketCapture() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkWatcherName = "nw1";
  const packetCaptureName = "pc1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.packetCaptures.beginStopAndWait(
    resourceGroupName,
    networkWatcherName,
    packetCaptureName,
  );
  console.log(result);
}

async function main() {
  await stopPacketCapture();
}

main().catch(console.error);
