// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list RecoveryJob resources by RecoveryPlan
 *
 * @summary list RecoveryJob resources by RecoveryPlan
 * x-ms-original-file: 2026-04-01-preview/RecoveryJobs_List_MaximumSet_Gen.json
 */
async function recoveryJobsListMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.recoveryJobs.list("sampleServiceGroupName", "samplePlanName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await recoveryJobsListMaximumSet();
}

main().catch(console.error);
