// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to queries the specified connection analyzer for diagnostic results.
 *
 * @summary queries the specified connection analyzer for diagnostic results.
 * x-ms-original-file: 2025-09-01/NetworkWatcherConnectionAnalyzerQuery.json
 */
async function queryConnectionAnalyzer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7f4a1d92-3b6e-4c8f-9a25-e1b8c3d7f024";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkWatchers.connectionAnalyzersQuery(
    "connectionAnalyzerRG",
    "nw1",
    "ca1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await queryConnectionAnalyzer();
}

main().catch(console.error);
