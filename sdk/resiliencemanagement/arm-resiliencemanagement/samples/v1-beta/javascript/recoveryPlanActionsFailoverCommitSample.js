// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this action triggers the failover commit operation on the recovery orchestration plan for the qualified resources.
 *
 * @summary this action triggers the failover commit operation on the recovery orchestration plan for the qualified resources.
 * x-ms-original-file: 2026-04-01-preview/RecoveryPlanActions_FailoverCommit_MaximumSet_Gen.json
 */
async function recoveryPlanActionsFailoverCommitMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.recoveryPlanActions.failoverCommit(
    "sampleServiceGroupName",
    "qmn",
    "samplePlanName",
  );
  console.log(result);
}

async function main() {
  await recoveryPlanActionsFailoverCommitMaximumSet();
}

main().catch(console.error);
