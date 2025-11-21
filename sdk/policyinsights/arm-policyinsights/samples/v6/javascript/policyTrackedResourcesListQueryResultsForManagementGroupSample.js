// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Queries policy tracked resources under the management group.
 *
 * @summary Queries policy tracked resources under the management group.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/preview/2018-07-01-preview/examples/PolicyTrackedResources_QueryManagementGroupScope.json
 */
async function queryAtManagementGroupScope() {
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
async function queryAtManagementGroupScopeUsingQueryParameters() {
  const managementGroupName = "myManagementGroup";
  const policyTrackedResourcesResource = "default";
  const top = 1;
  const filter =
    "PolicyAssignmentId eq '/subscriptions/fff8dfdb-fff3-fff0-fff4-fffdcbe6b2ef/resourceGroups/myResourceGroup/providers/Microsoft.Authorization/policyAssignments/myPolicyAssignment' AND TrackedResourceId eq '/subscriptions/fff8dfdb-fff3-fff0-fff4-fffdcbe6b2ef/resourceGroups/myResourceGroup/providers/Microsoft.Example/exampleResourceType/exampleTrackedResourceName'";
  const options = { top, filter };
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

async function main() {
  await queryAtManagementGroupScope();
  await queryAtManagementGroupScopeUsingQueryParameters();
}

main().catch(console.error);
