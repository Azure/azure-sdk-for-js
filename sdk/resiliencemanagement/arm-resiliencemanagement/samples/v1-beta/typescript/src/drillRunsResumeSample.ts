// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this unblocks a Failover workflow that is paused after the Fault stage, to proceed to the Failover stage.
 *
 * @summary this unblocks a Failover workflow that is paused after the Fault stage, to proceed to the Failover stage.
 * x-ms-original-file: 2026-04-01-preview/DrillRuns_Resume_MaximumSet_Gen.json
 */
async function drillRunsResumeMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.drillRuns.resume(
    "sampleServiceGroupName",
    "qmn",
    "drill1",
    "ca92602e-53bf-43d2-ae62-d3fc940474b3",
  );
}

async function main(): Promise<void> {
  await drillRunsResumeMaximumSet();
}

main().catch(console.error);
