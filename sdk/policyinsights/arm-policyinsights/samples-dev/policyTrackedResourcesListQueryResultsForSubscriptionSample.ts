// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * This sample demonstrates how to Queries policy tracked resources under the subscription.
 *
 * @summary Queries policy tracked resources under the subscription.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/preview/2018-07-01-preview/examples/PolicyTrackedResources_QuerySubscriptionScope.json
 */

import type { PolicyTrackedResourcesListQueryResultsForSubscriptionOptionalParams } from "@azure/arm-policyinsights";
import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function queryAtSubscriptionScope(): Promise<void> {
  const subscriptionId =
    process.env["POLICYINSIGHTS_SUBSCRIPTION_ID"] || "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const policyTrackedResourcesResource = "default";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.policyTrackedResources.listQueryResultsForSubscription(
    policyTrackedResourcesResource,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Queries policy tracked resources under the subscription.
 *
 * @summary Queries policy tracked resources under the subscription.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/preview/2018-07-01-preview/examples/PolicyTrackedResources_QuerySubscriptionScopeWithFilterAndTop.json
 */
async function queryAtSubscriptionScopeUsingQueryParameters(): Promise<void> {
  const subscriptionId =
    process.env["POLICYINSIGHTS_SUBSCRIPTION_ID"] || "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const policyTrackedResourcesResource = "default";
  const top = 1;
  const filter =
    "PolicyAssignmentId eq '/subscriptions/fff8dfdb-fff3-fff0-fff4-fffdcbe6b2ef/resourceGroups/myResourceGroup/providers/Microsoft.Authorization/policyAssignments/myPolicyAssignment' AND TrackedResourceId eq '/subscriptions/fff8dfdb-fff3-fff0-fff4-fffdcbe6b2ef/resourceGroups/myResourceGroup/providers/Microsoft.Example/exampleResourceType/exampleTrackedResourceName'";
  const options: PolicyTrackedResourcesListQueryResultsForSubscriptionOptionalParams = {
    queryOptions: {
      top,
      filter,
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.policyTrackedResources.listQueryResultsForSubscription(
    policyTrackedResourcesResource,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await queryAtSubscriptionScope();
  await queryAtSubscriptionScopeUsingQueryParameters();
}

main().catch(console.error);
