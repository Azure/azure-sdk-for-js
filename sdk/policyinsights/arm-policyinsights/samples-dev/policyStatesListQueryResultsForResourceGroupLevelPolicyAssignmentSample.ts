// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * This sample demonstrates how to Queries policy states for the resource group level policy assignment.
 *
 * @summary Queries policy states for the resource group level policy assignment.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_QueryResourceGroupLevelPolicyAssignmentScope.json
 */

import type { PolicyStatesListQueryResultsForResourceGroupLevelPolicyAssignmentOptionalParams } from "@azure/arm-policyinsights";
import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function queryLatestAtResourceGroupLevelPolicyAssignmentScope(): Promise<void> {
  const policyStatesResource = "latest";
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const resourceGroupName = process.env["POLICYINSIGHTS_RESOURCE_GROUP"] || "myResourceGroup";
  const policyAssignmentName = "myPolicyAssignment";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForResourceGroupLevelPolicyAssignment(
    policyStatesResource,
    subscriptionId,
    resourceGroupName,
    policyAssignmentName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Queries policy states for the resource group level policy assignment.
 *
 * @summary Queries policy states for the resource group level policy assignment.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_QueryResourceGroupLevelPolicyAssignmentScopeNextLink.json
 */
async function queryLatestAtResourceGroupLevelPolicyAssignmentScopeWithNextLink(): Promise<void> {
  const policyStatesResource = "latest";
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const resourceGroupName = process.env["POLICYINSIGHTS_RESOURCE_GROUP"] || "myResourceGroup";
  const policyAssignmentName = "myPolicyAssignment";
  const skipToken = "WpmWfBSvPhkAK6QD";
  const options: PolicyStatesListQueryResultsForResourceGroupLevelPolicyAssignmentOptionalParams = {
    queryOptions: { skipToken },
  };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForResourceGroupLevelPolicyAssignment(
    policyStatesResource,
    subscriptionId,
    resourceGroupName,
    policyAssignmentName,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await queryLatestAtResourceGroupLevelPolicyAssignmentScope();
  await queryLatestAtResourceGroupLevelPolicyAssignmentScopeWithNextLink();
}

main().catch(console.error);
