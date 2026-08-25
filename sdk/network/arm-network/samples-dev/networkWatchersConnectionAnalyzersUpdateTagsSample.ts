// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the tags of the specified connection analyzer.
 *
 * @summary updates the tags of the specified connection analyzer.
 * x-ms-original-file: 2025-09-01/NetworkWatcherConnectionAnalyzerUpdateTags.json
 */
async function updateConnectionAnalyzerTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7f4a1d92-3b6e-4c8f-9a25-e1b8c3d7f024";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkWatchers.connectionAnalyzersUpdateTags(
    "connectionAnalyzerRG",
    "nw1",
    "ca1",
    { tags: { tag1: "value1", tag2: "value2" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateConnectionAnalyzerTags();
}

main().catch(console.error);
