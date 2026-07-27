// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this action triggers the test failover cleanup operation on the recovery orchestration plan for the qualified resources.
 *
 * @summary this action triggers the test failover cleanup operation on the recovery orchestration plan for the qualified resources.
 * x-ms-original-file: 2026-04-01-preview/RecoveryPlanActions_TestFailoverCleanup_MaximumSet_Gen.json
 */
async function recoveryPlanActionsTestFailoverCleanupMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.recoveryPlanActions.testFailoverCleanup(
    "sampleServiceGroupName",
    "qmn",
    "samplePlanName",
    { comments: "Test failover clean-up comments" },
  );
  console.log(result);
}

async function main() {
  await recoveryPlanActionsTestFailoverCleanupMaximumSet();
}

main().catch(console.error);
