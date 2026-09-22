// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this enables the user to mark this stage as complete, disabling further retries on it.
 *
 * @summary this enables the user to mark this stage as complete, disabling further retries on it.
 * x-ms-original-file: 2026-04-01-preview/DrillRuns_MarkAsComplete_MaximumSet_Gen.json
 */
async function drillRunsMarkAsCompleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.drillRuns.markAsComplete(
    "sampleServiceGroupName",
    "qmn",
    "drill1",
    "ca92602e-53bf-43d2-ae62-d3fc940474b3",
    { drillRunStage: "Fault" },
  );
}

async function main(): Promise<void> {
  await drillRunsMarkAsCompleteMaximumSet();
}

main().catch(console.error);
