// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to queries component policy states for the resource group level policy assignment.
 *
 * @summary queries component policy states for the resource group level policy assignment.
 * x-ms-original-file: 2024-10-01/ComponentPolicyStates_QueryResourceGroupLevelPolicyAssignmentScope.json
 */
async function queryLatestAtResourceGroupLevelPolicyAssignmentScope() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result =
    await client.componentPolicyStates.listQueryResultsForResourceGroupLevelPolicyAssignment(
      "fffedd8f-ffff-fffd-fffd-fffed2f84852",
      "myResourceGroup",
      "myPolicyAssignment",
      "latest",
    );
  console.log(result);
}

async function main() {
  await queryLatestAtResourceGroupLevelPolicyAssignmentScope();
}

main().catch(console.error);
