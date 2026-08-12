// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to queries policy tracked resources under the resource.
 *
 * @summary queries policy tracked resources under the resource.
 * x-ms-original-file: 2018-07-01-preview/PolicyTrackedResources_QueryResourceScope.json
 */
async function queryAtResourceScope() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyTrackedResources.listQueryResultsForResource(
    "subscriptions/fff8dfdb-fff3-fff0-fff4-fffdcbe6b2ef/resourceGroups/myResourceGroup/providers/Microsoft.Example/exampleResourceType/myResource",
    "default",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy tracked resources under the resource.
 *
 * @summary queries policy tracked resources under the resource.
 * x-ms-original-file: 2018-07-01-preview/PolicyTrackedResources_QueryResourceScopeWithFilterAndTop.json
 */
async function queryAtResourceScopeUsingQueryParameters() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyTrackedResources.listQueryResultsForResource(
    "subscriptions/fff8dfdb-fff3-fff0-fff4-fffdcbe6b2ef/resourceGroups/myResourceGroup/providers/Microsoft.Example/exampleResourceType/myResource",
    "default",
    {
      queryOptions: {
        top: 1,
        filter:
          "PolicyAssignmentId eq '/subscriptions/fff8dfdb-fff3-fff0-fff4-fffdcbe6b2ef/resourceGroups/myResourceGroup/providers/Microsoft.Authorization/policyAssignments/myPolicyAssignment' AND TrackedResourceId eq '/subscriptions/fff8dfdb-fff3-fff0-fff4-fffdcbe6b2ef/resourceGroups/myResourceGroup/providers/Microsoft.Example/exampleResourceType/myResource/nestedResourceType/TrackedResource1'",
      },
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await queryAtResourceScope();
  await queryAtResourceScopeUsingQueryParameters();
}

main().catch(console.error);
