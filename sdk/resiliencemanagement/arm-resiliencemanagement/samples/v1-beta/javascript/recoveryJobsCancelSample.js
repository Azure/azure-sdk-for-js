// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this action attempts to cancel the ongoing recovery orchestration job.
 *
 * @summary this action attempts to cancel the ongoing recovery orchestration job.
 * x-ms-original-file: 2026-04-01-preview/RecoveryJobs_Cancel_MaximumSet_Gen.json
 */
async function recoveryJobsCancelMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.recoveryJobs.cancel(
    "sampleServiceGroup",
    "qmn",
    "samplePlanName",
    "c56888ef-9ced-4001-a6d4-7145a0309bdb",
    { description: "Cancelling the recovery job due to user request" },
  );
  console.log(result);
}

async function main() {
  await recoveryJobsCancelMaximumSet();
}

main().catch(console.error);
