// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Job resource
 *
 * @summary get a Job resource
 * x-ms-original-file: 2026-05-01-preview/Jobs_Get_MaximumSet_Gen.json
 */
async function jobsGetMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new WorkloadOrchestrationManagementClient(credential);
  const result = await client.jobs.get(
    "subscriptions/612CB927-8AC8-42DD-B74E-C676C3960BA5/resourceGroups/rgconfigurationmanager/providers/Microsoft.Edge/targets/testTarget",
    "jobsName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await jobsGetMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
