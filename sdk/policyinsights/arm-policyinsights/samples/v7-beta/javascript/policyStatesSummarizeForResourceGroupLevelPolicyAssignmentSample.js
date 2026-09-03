// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to summarizes policy states for the resource group level policy assignment.
 *
 * @summary summarizes policy states for the resource group level policy assignment.
 * x-ms-original-file: 2024-10-01/PolicyStates_SummarizeResourceGroupLevelPolicyAssignmentScope.json
 */
async function summarizeAtPolicyAssignmentScope() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.policyStates.summarizeForResourceGroupLevelPolicyAssignment(
    "latest",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    "myResourceGroup",
    "b7a1ca2596524e3ab19597f2",
  );
  console.log(result);
}

async function main() {
  await summarizeAtPolicyAssignmentScope();
}

main().catch(console.error);
