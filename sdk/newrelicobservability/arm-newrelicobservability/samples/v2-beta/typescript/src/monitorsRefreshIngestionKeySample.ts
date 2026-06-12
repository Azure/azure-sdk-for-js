// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NewRelicObservability } from "@azure/arm-newrelicobservability";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to refreshes the ingestion key for all monitors linked to the same account associated to the underlying monitor.
 *
 * @summary refreshes the ingestion key for all monitors linked to the same account associated to the underlying monitor.
 * x-ms-original-file: 2025-05-01-preview/Monitors_RefreshIngestionKey.json
 */
async function monitorsRefreshIngestionKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  await client.monitors.refreshIngestionKey("myResourceGroup", "myMonitor");
}

async function main(): Promise<void> {
  await monitorsRefreshIngestionKey();
}

main().catch(console.error);
