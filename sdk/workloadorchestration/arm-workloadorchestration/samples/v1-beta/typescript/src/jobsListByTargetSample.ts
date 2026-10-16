// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Jobs by parent resource
 *
 * @summary list Jobs by parent resource
 * x-ms-original-file: 2026-05-01-preview/Jobs_ListByTarget_MaximumSet_Gen.json
 */
async function jobsListByTargetMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new WorkloadOrchestrationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.jobs.listByTarget(
    "subscriptions/612CB927-8AC8-42DD-B74E-C676C3960BA5/resourceGroups/rgconfigurationmanager/providers/Microsoft.Edge/targets/testTarget",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list Jobs by parent resource
 *
 * @summary list Jobs by parent resource
 * x-ms-original-file: 2026-05-01-preview/Jobs_ListByTarget_MinimumSet_Gen.json
 */
async function jobsListByTargetMaximumSetGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new WorkloadOrchestrationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.jobs.listByTarget(
    "subscriptions/612CB927-8AC8-42DD-B74E-C676C3960BA5/resourceGroups/rgconfigurationmanager/providers/Microsoft.Edge/targets/testTarget",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await jobsListByTargetMaximumSetGeneratedByMaximumSetRule();
  await jobsListByTargetMaximumSetGeneratedByMinimumSetRule();
}

main().catch(console.error);
