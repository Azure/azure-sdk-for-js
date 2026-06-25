// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to queries policy events for the resource group level policy assignment.
 *
 * @summary queries policy events for the resource group level policy assignment.
 * x-ms-original-file: 2024-10-01/PolicyEvents_QueryResourceGroupLevelPolicyAssignmentScope.json
 */
async function queryAtResourceGroupLevelPolicyAssignmentScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyEvents.listQueryResultsForResourceGroupLevelPolicyAssignment(
    "default",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    "myResourceGroup",
    "myPolicyAssignment",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy events for the resource group level policy assignment.
 *
 * @summary queries policy events for the resource group level policy assignment.
 * x-ms-original-file: 2024-10-01/PolicyEvents_QueryResourceGroupLevelPolicyAssignmentScopeNextLink.json
 */
async function queryAtResourceGroupLevelPolicyAssignmentScopeWithNextLink(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyEvents.listQueryResultsForResourceGroupLevelPolicyAssignment(
    "default",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    "myResourceGroup",
    "myPolicyAssignment",
    { skipToken: "WpmWfBSvPhkAK6QD" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await queryAtResourceGroupLevelPolicyAssignmentScope();
  await queryAtResourceGroupLevelPolicyAssignmentScopeWithNextLink();
}

main().catch(console.error);
