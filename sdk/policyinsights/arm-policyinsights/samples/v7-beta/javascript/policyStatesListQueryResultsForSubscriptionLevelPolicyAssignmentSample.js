// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to queries policy states for the subscription level policy assignment.
 *
 * @summary queries policy states for the subscription level policy assignment.
 * x-ms-original-file: 2024-10-01/PolicyStates_QuerySubscriptionLevelPolicyAssignmentScope.json
 */
async function queryLatestAtSubscriptionLevelPolicyAssignmentScope() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForSubscriptionLevelPolicyAssignment(
    "latest",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    "ec8f9645-8ecb-4abb-9c0b-5292f19d4003",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy states for the subscription level policy assignment.
 *
 * @summary queries policy states for the subscription level policy assignment.
 * x-ms-original-file: 2024-10-01/PolicyStates_QuerySubscriptionLevelPolicyAssignmentScopeNextLink.json
 */
async function queryLatestAtSubscriptionLevelPolicyAssignmentScopeWithNextLink() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForSubscriptionLevelPolicyAssignment(
    "latest",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    "ec8f9645-8ecb-4abb-9c0b-5292f19d4003",
    { queryOptions: { skipToken: "WpmWfBSvPhkAK6QD" } },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await queryLatestAtSubscriptionLevelPolicyAssignmentScope();
  await queryLatestAtSubscriptionLevelPolicyAssignmentScopeWithNextLink();
}

main().catch(console.error);
