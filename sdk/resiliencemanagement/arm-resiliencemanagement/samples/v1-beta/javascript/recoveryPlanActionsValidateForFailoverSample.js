// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this action checks if the recovery orchestration plan is eligible for failover operation, ensuring it meets the necessary criteria and provides a list of qualified and unqualified resources.
 *
 * @summary this action checks if the recovery orchestration plan is eligible for failover operation, ensuring it meets the necessary criteria and provides a list of qualified and unqualified resources.
 * x-ms-original-file: 2026-04-01-preview/RecoveryPlanActions_ValidateForFailover_MaximumSet_Gen.json
 */
async function recoveryPlanActionsValidateForFailoverMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.recoveryPlanActions.validateForFailover(
    "sampleServiceGroupName",
    "qmn",
    "samplePlanName",
    {
      failoverDirection: "FromSpecificLocations",
      failoverRequestProperties: { sourceLocations: ["westus"] },
    },
  );
  console.log(result);
}

async function main() {
  await recoveryPlanActionsValidateForFailoverMaximumSet();
}

main().catch(console.error);
