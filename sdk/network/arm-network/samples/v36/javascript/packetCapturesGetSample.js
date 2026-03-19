// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a packet capture session by name.
 *
 * @summary Gets a packet capture session by name.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkWatcherPacketCaptureGet.json
 */
async function getPacketCapture() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkWatcherName = "nw1";
  const packetCaptureName = "pc1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.packetCaptures.get(
    resourceGroupName,
    networkWatcherName,
    packetCaptureName,
  );
  console.log(result);
}

async function main() {
  await getPacketCapture();
}

main().catch(console.error);
