// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  FirewallPacketCaptureParameters} from "@azure/arm-network";
import {
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Runs a packet capture operation on AzureFirewall.
 *
 * @summary Runs a packet capture operation on AzureFirewall.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-10-01/examples/AzureFirewallPacketCaptureOperation.json
 */
async function azureFirewallPacketCaptureOperation(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const azureFirewallName = "azureFirewall1";
  const parameters: FirewallPacketCaptureParameters = {
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

async function main(): Promise<void> {
  await azureFirewallPacketCaptureOperation();
}

main().catch(console.error);
