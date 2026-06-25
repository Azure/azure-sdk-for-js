// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to queries policy events for the subscription level policy assignment.
 *
 * @summary queries policy events for the subscription level policy assignment.
 * x-ms-original-file: 2024-10-01/PolicyEvents_QuerySubscriptionLevelPolicyAssignmentScope.json
 */
async function queryAtSubscriptionLevelPolicyAssignmentScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyEvents.listQueryResultsForSubscriptionLevelPolicyAssignment(
    "default",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    "ec8f9645-8ecb-4abb-9c0b-5292f19d4003",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy events for the subscription level policy assignment.
 *
 * @summary queries policy events for the subscription level policy assignment.
 * x-ms-original-file: 2024-10-01/PolicyEvents_QuerySubscriptionLevelPolicyAssignmentScopeNextLink.json
 */
async function queryAtSubscriptionLevelPolicyAssignmentScopeWithNextLink(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyEvents.listQueryResultsForSubscriptionLevelPolicyAssignment(
    "default",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    "ec8f9645-8ecb-4abb-9c0b-5292f19d4003",
    { skipToken: "WpmWfBSvPhkAK6QD" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await queryAtSubscriptionLevelPolicyAssignmentScope();
  await queryAtSubscriptionLevelPolicyAssignmentScopeWithNextLink();
}

main().catch(console.error);
