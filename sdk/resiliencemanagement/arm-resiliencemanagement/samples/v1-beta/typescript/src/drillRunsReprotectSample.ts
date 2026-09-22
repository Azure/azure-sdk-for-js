// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this initiates a new Reprotect operation on this Drill Run.
 *
 * @summary this initiates a new Reprotect operation on this Drill Run.
 * x-ms-original-file: 2026-04-01-preview/DrillRuns_Reprotect_MaximumSet_Gen.json
 */
async function drillRunsReprotectMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.drillRuns.reprotect(
    "sampleServiceGroupName",
    "qmn",
    "drill1",
    "ca92602e-53bf-43d2-ae62-d3fc940474b3",
  );
}

async function main(): Promise<void> {
  await drillRunsReprotectMaximumSet();
}

main().catch(console.error);
