// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to queries policy tracked resources under the management group.
 *
 * @summary queries policy tracked resources under the management group.
 * x-ms-original-file: 2018-07-01-preview/PolicyTrackedResources_QueryManagementGroupScope.json
 */
async function queryAtManagementGroupScope() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyTrackedResources.listQueryResultsForManagementGroup(
    "myManagementGroup",
    "default",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy tracked resources under the management group.
 *
 * @summary queries policy tracked resources under the management group.
 * x-ms-original-file: 2018-07-01-preview/PolicyTrackedResources_QueryManagementGroupScopeWithFilterAndTop.json
 */
async function queryAtManagementGroupScopeUsingQueryParameters() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyTrackedResources.listQueryResultsForManagementGroup(
    "myManagementGroup",
    "default",
    {
      queryOptions: {
        top: 1,
        filter:
          "PolicyAssignmentId eq '/subscriptions/fff8dfdb-fff3-fff0-fff4-fffdcbe6b2ef/resourceGroups/myResourceGroup/providers/Microsoft.Authorization/policyAssignments/myPolicyAssignment' AND TrackedResourceId eq '/subscriptions/fff8dfdb-fff3-fff0-fff4-fffdcbe6b2ef/resourceGroups/myResourceGroup/providers/Microsoft.Example/exampleResourceType/exampleTrackedResourceName'",
      },
    },
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
