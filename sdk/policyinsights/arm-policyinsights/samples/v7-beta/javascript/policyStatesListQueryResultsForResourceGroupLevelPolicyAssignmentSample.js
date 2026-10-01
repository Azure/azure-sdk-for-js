// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to queries policy states for the resource group level policy assignment.
 *
 * @summary queries policy states for the resource group level policy assignment.
 * x-ms-original-file: 2024-10-01/PolicyStates_QueryResourceGroupLevelPolicyAssignmentScope.json
 */
async function queryLatestAtResourceGroupLevelPolicyAssignmentScope() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForResourceGroupLevelPolicyAssignment(
    "latest",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    "myResourceGroup",
    "myPolicyAssignment",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy states for the resource group level policy assignment.
 *
 * @summary queries policy states for the resource group level policy assignment.
 * x-ms-original-file: 2024-10-01/PolicyStates_QueryResourceGroupLevelPolicyAssignmentScopeNextLink.json
 */
async function queryLatestAtResourceGroupLevelPolicyAssignmentScopeWithNextLink() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForResourceGroupLevelPolicyAssignment(
    "latest",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    "myResourceGroup",
    "myPolicyAssignment",
    { queryOptions: { skipToken: "WpmWfBSvPhkAK6QD" } },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await queryLatestAtResourceGroupLevelPolicyAssignmentScope();
  await queryLatestAtResourceGroupLevelPolicyAssignmentScopeWithNextLink();
}

main().catch(console.error);
