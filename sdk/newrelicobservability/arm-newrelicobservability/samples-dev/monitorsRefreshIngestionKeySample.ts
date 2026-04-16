// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NewRelicObservability } from "@azure/arm-newrelicobservability";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Refreshes the ingestion key for all monitors linked to the same account associated to the underlying monitor.
 *
 * @summary Refreshes the ingestion key for all monitors linked to the same account associated to the underlying monitor.
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/Monitors_RefreshIngestionKey.json
 */
async function monitorsRefreshIngestionKey(): Promise<void> {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["NEWRELICOBSERVABILITY_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.monitors.refreshIngestionKey(
    resourceGroupName,
    monitorName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await monitorsRefreshIngestionKey();
}

main().catch(console.error);
