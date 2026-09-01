// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified connection analyzer.
 *
 * @summary deletes the specified connection analyzer.
 * x-ms-original-file: 2025-09-01/NetworkWatcherConnectionAnalyzerDelete.json
 */
async function deleteConnectionAnalyzer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7f4a1d92-3b6e-4c8f-9a25-e1b8c3d7f024";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.networkWatchers.connectionAnalyzersDelete("connectionAnalyzerRG", "nw1", "ca1");
}

async function main() {
  await deleteConnectionAnalyzer();
}

main().catch(console.error);
