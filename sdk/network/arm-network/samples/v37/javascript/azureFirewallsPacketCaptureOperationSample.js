// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to runs a packet capture operation on AzureFirewall.
 *
 * @summary runs a packet capture operation on AzureFirewall.
 * x-ms-original-file: 2025-05-01/AzureFirewallPacketCaptureOperation.json
 */
async function azureFirewallPacketCaptureOperation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.azureFirewalls.packetCaptureOperation("rg1", "azureFirewall1", {
    durationInSeconds: 300,
    fileName: "azureFirewallPacketCapture",
    filters: [
      { destinationPorts: ["4500"], destinations: ["20.1.2.0"], sources: ["20.1.1.0"] },
      {
        destinationPorts: ["123", "80"],
        destinations: ["10.1.2.0"],
        sources: ["10.1.1.0", "10.1.1.1"],
      },
    ],
    flags: [{ type: "syn" }, { type: "fin" }],
    numberOfPacketsToCapture: 5000,
    operation: "Status",
    sasUrl: "someSASURL",
    protocol: "Any",
  });
  console.log(result);
}

async function main() {
  await azureFirewallPacketCaptureOperation();
}

main().catch(console.error);
