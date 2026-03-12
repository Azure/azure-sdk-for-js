// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * This sample demonstrates how to Queries policy states for the subscription level policy assignment.
 *
 * @summary Queries policy states for the subscription level policy assignment.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_QuerySubscriptionLevelPolicyAssignmentScope.json
 */

import type { PolicyStatesListQueryResultsForSubscriptionLevelPolicyAssignmentOptionalParams } from "@azure/arm-policyinsights";
import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function queryLatestAtSubscriptionLevelPolicyAssignmentScope(): Promise<void> {
  const policyStatesResource = "latest";
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const policyAssignmentName = "ec8f9645-8ecb-4abb-9c0b-5292f19d4003";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForSubscriptionLevelPolicyAssignment(
    policyStatesResource,
    subscriptionId,
    policyAssignmentName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Queries policy states for the subscription level policy assignment.
 *
 * @summary Queries policy states for the subscription level policy assignment.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_QuerySubscriptionLevelPolicyAssignmentScopeNextLink.json
 */
async function queryLatestAtSubscriptionLevelPolicyAssignmentScopeWithNextLink(): Promise<void> {
  const policyStatesResource = "latest";
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const policyAssignmentName = "ec8f9645-8ecb-4abb-9c0b-5292f19d4003";
  const skipToken = "WpmWfBSvPhkAK6QD";
  const options: PolicyStatesListQueryResultsForSubscriptionLevelPolicyAssignmentOptionalParams = {
    queryOptions: { skipToken },
  };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForSubscriptionLevelPolicyAssignment(
    policyStatesResource,
    subscriptionId,
    policyAssignmentName,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await queryLatestAtSubscriptionLevelPolicyAssignmentScope();
  await queryLatestAtSubscriptionLevelPolicyAssignmentScopeWithNextLink();
}

main().catch(console.error);
