// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Job resource
 *
 * @summary get a Job resource
 * x-ms-original-file: 2025-06-01/Jobs_Get_MaximumSet_Gen.json
 */
async function jobsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.jobs.get("gt", "jobsName");
  console.log(result);
}

async function main() {
  await jobsGetMaximumSet();
}

main().catch(console.error);
