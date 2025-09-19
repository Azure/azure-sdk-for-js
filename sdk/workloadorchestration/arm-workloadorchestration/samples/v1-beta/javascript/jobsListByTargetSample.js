// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Jobs by parent resource
 *
 * @summary list Jobs by parent resource
 * x-ms-original-file: 2025-06-01/Jobs_ListByTarget_MaximumSet_Gen.json
 */
async function jobsListByTargetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jobs.listByTarget("gt")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await jobsListByTargetMaximumSet();
}

main().catch(console.error);
