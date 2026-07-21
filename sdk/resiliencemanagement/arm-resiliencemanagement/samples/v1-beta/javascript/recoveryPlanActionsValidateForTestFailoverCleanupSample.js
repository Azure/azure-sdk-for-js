// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this action checks if the recovery orchestration plan is eligible for test failover cleanup operation, ensuring it meets the necessary criteria and provides a list of qualified and unqualified resources.
 *
 * @summary this action checks if the recovery orchestration plan is eligible for test failover cleanup operation, ensuring it meets the necessary criteria and provides a list of qualified and unqualified resources.
 * x-ms-original-file: 2026-04-01-preview/RecoveryPlanActions_ValidateForTestFailoverCleanup_MaximumSet_Gen.json
 */
async function recoveryPlanActionsValidateForTestFailoverCleanupMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.recoveryPlanActions.validateForTestFailoverCleanup(
    "sampleServiceGroupName",
    "qmn",
    "samplePlanName",
  );
  console.log(result);
}

async function main() {
  await recoveryPlanActionsValidateForTestFailoverCleanupMaximumSet();
}

main().catch(console.error);
