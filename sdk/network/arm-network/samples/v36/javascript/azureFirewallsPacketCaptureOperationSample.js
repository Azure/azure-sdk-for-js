// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Runs a packet capture operation on AzureFirewall.
 *
 * @summary Runs a packet capture operation on AzureFirewall.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/AzureFirewallPacketCaptureOperation.json
 */
async function azureFirewallPacketCaptureOperation() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const azureFirewallName = "azureFirewall1";
  const parameters = {
    durationInSeconds: 300,
    fileName: "azureFirewallPacketCapture",
    filters: [
      {
        destinationPorts: ["4500"],
        destinations: ["20.1.2.0"],
        sources: ["20.1.1.0"],
      },
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
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.azureFirewalls.beginPacketCaptureOperationAndWait(
    resourceGroupName,
    azureFirewallName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await azureFirewallPacketCaptureOperation();
}

main().catch(console.error);
