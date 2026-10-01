// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitorworkspaces";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates metrics container settings for a monitoring account.
 *
 * @summary creates or updates metrics container settings for a monitoring account.
 * x-ms-original-file: 2025-10-03/MetricsContainers_CreateOrUpdate_MaximumSet_Gen.json
 */
async function metricsContainersCreateOrUpdateMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.metricsContainers.createOrUpdate(
    "rgazuremonitorworkspace",
    "myAzureMonitorWorkspace",
    "default",
    { properties: { version: "1.0" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await metricsContainersCreateOrUpdateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
