// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a DrillRun
 *
 * @summary get a DrillRun
 * x-ms-original-file: 2026-04-01-preview/DrillRuns_Get_MaximumSet_Gen.json
 */
async function drillRunsGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.drillRuns.get(
    "sampleServiceGroupName",
    "drill1",
    "ca92602e-53bf-43d2-ae62-d3fc940474b3",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await drillRunsGetMaximumSet();
}

main().catch(console.error);
