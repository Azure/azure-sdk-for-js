// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Queries policy states for the subscription level policy assignment.
 *
 * @summary Queries policy states for the subscription level policy assignment.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_QuerySubscriptionLevelPolicyAssignmentScope.json
 */
async function queryLatestAtSubscriptionLevelPolicyAssignmentScope() {
  const policyStatesResource = "latest";
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const policyAssignmentName = "ec8f9645-8ecb-4abb-9c0b-5292f19d4003";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.policyStates.listQueryResultsForSubscriptionLevelPolicyAssignment(
    policyStatesResource,
    subscriptionId,
    policyAssignmentName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Queries policy states for the subscription level policy assignment.
 *
 * @summary Queries policy states for the subscription level policy assignment.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_QuerySubscriptionLevelPolicyAssignmentScopeNextLink.json
 */
async function queryLatestAtSubscriptionLevelPolicyAssignmentScopeWithNextLink() {
  const policyStatesResource = "latest";
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const policyAssignmentName = "ec8f9645-8ecb-4abb-9c0b-5292f19d4003";
  const skipToken = "WpmWfBSvPhkAK6QD";
  const options = { queryOptions: { skipToken } };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.policyStates.listQueryResultsForSubscriptionLevelPolicyAssignment(
    policyStatesResource,
    subscriptionId,
    policyAssignmentName,
    options,
  );
  console.log(result);
}

async function main() {
  await queryLatestAtSubscriptionLevelPolicyAssignmentScope();
  await queryLatestAtSubscriptionLevelPolicyAssignmentScopeWithNextLink();
}

main().catch(console.error);
