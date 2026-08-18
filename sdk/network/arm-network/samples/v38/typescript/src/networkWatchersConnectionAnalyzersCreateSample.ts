// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a connection analyzer in the specified network watcher.
 *
 * @summary creates or updates a connection analyzer in the specified network watcher.
 * x-ms-original-file: 2025-09-01/NetworkWatcherConnectionAnalyzerCreate.json
 */
async function createConnectionAnalyzer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7f4a1d92-3b6e-4c8f-9a25-e1b8c3d7f024";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkWatchers.connectionAnalyzersCreate(
    "connectionAnalyzerRG",
    "nw1",
    "ca1",
    {
      properties: {
        diagnosticOperations: ["ConnectivityCheck"],
        source: {
          type: "VM",
          resourceId:
            "/subscriptions/7f4a1d92-3b6e-4c8f-9a25-e1b8c3d7f024/resourceGroups/connectionAnalyzerRG/providers/Microsoft.Compute/virtualMachines/ct1",
        },
        destination: { address: "www.bing.com", type: "ExternalAddress" },
        outputSettings: {
          storageAccountSettings: {
            storageAccountId:
              "/subscriptions/7f4a1d92-3b6e-4c8f-9a25-e1b8c3d7f024/resourceGroups/connectionAnalyzerRG/providers/Microsoft.Storage/storageAccounts/sa1",
          },
        },
        diagnosticOperationsSettings: {
          connectivityCheckSettings: { generatePath: true, preferredIPVersion: "IPv4" },
        },
      },
      location: "eastus",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createConnectionAnalyzer();
}

main().catch(console.error);
