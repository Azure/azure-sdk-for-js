// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to queries policy tracked resources under the subscription.
 *
 * @summary queries policy tracked resources under the subscription.
 * x-ms-original-file: 2018-07-01-preview/PolicyTrackedResources_QuerySubscriptionScope.json
 */
async function queryAtSubscriptionScope() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const client = new PolicyInsightsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.policyTrackedResources.listQueryResultsForSubscription(
    "default",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy tracked resources under the subscription.
 *
 * @summary queries policy tracked resources under the subscription.
 * x-ms-original-file: 2018-07-01-preview/PolicyTrackedResources_QuerySubscriptionScopeWithFilterAndTop.json
 */
async function queryAtSubscriptionScopeUsingQueryParameters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const client = new PolicyInsightsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.policyTrackedResources.listQueryResultsForSubscription(
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
  await queryAtSubscriptionScope();
  await queryAtSubscriptionScopeUsingQueryParameters();
}

main().catch(console.error);
