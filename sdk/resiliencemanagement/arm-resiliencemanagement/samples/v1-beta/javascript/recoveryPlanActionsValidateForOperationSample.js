// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this action checks if the recovery orchestration plan is eligible for operations like failover and reprotect, ensuring it meets the necessary criteria.
 *
 * @summary this action checks if the recovery orchestration plan is eligible for operations like failover and reprotect, ensuring it meets the necessary criteria.
 * x-ms-original-file: 2026-04-01-preview/RecoveryPlanActions_ValidateForOperation_MaximumSet_Gen.json
 */
async function recoveryPlanActionsValidateForOperationMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.recoveryPlanActions.validateForOperation(
    "sampleServiceGroupName",
    "qmn",
    "samplePlanName",
    { operationName: "Failover" },
  );
  console.log(result);
}

async function main() {
  await recoveryPlanActionsValidateForOperationMaximumSet();
}

main().catch(console.error);
