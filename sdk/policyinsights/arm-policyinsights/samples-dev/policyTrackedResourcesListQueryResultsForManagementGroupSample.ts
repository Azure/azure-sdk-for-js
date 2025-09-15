// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * This sample demonstrates how to Queries policy tracked resources under the management group.
 *
 * @summary Queries policy tracked resources under the management group.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/preview/2018-07-01-preview/examples/PolicyTrackedResources_QueryManagementGroupScope.json
 */

import type { PolicyTrackedResourcesListQueryResultsForManagementGroupOptionalParams } from "@azure/arm-policyinsights";
import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function queryAtManagementGroupScope(): Promise<void> {
  const managementGroupName = "myManagementGroup";
  const policyTrackedResourcesResource = "default";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyTrackedResources.listQueryResultsForManagementGroup(
    managementGroupName,
    policyTrackedResourcesResource,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Queries policy tracked resources under the management group.
 *
 * @summary Queries policy tracked resources under the management group.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/preview/2018-07-01-preview/examples/PolicyTrackedResources_QueryManagementGroupScopeWithFilterAndTop.json
 */
async function queryAtManagementGroupScopeUsingQueryParameters(): Promise<void> {
  const managementGroupName = "myManagementGroup";
  const policyTrackedResourcesResource = "default";
  const top = 1;
  const filter =
    "PolicyAssignmentId eq '/subscriptions/fff8dfdb-fff3-fff0-fff4-fffdcbe6b2ef/resourceGroups/myResourceGroup/providers/Microsoft.Authorization/policyAssignments/myPolicyAssignment' AND TrackedResourceId eq '/subscriptions/fff8dfdb-fff3-fff0-fff4-fffdcbe6b2ef/resourceGroups/myResourceGroup/providers/Microsoft.Example/exampleResourceType/exampleTrackedResourceName'";
  const options: PolicyTrackedResourcesListQueryResultsForManagementGroupOptionalParams = {
    queryOptions: {
      top,
      filter,
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyTrackedResources.listQueryResultsForManagementGroup(
    managementGroupName,
    policyTrackedResourcesResource,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await queryAtManagementGroupScope();
  await queryAtManagementGroupScopeUsingQueryParameters();
}

main().catch(console.error);
