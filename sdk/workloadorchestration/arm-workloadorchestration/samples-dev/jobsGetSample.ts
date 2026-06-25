// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Job resource
 *
 * @summary get a Job resource
 * x-ms-original-file: 2025-06-01/Jobs_Get_MaximumSet_Gen.json
 */
async function jobsGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new WorkloadOrchestrationManagementClient(credential);
  const result = await client.jobs.get("gt", "jobsName");
  console.log(result);
}

async function main(): Promise<void> {
  await jobsGetMaximumSet();
}

main().catch(console.error);
