// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to queries policy tracked resources under the resource group.
 *
 * @summary queries policy tracked resources under the resource group.
 * x-ms-original-file: 2018-07-01-preview/PolicyTrackedResources_QueryResourceGroupScope.json
 */
async function queryAtResourceGroupScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const client = new PolicyInsightsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.policyTrackedResources.listQueryResultsForResourceGroup(
    "myResourceGroup",
    "default",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy tracked resources under the resource group.
 *
 * @summary queries policy tracked resources under the resource group.
 * x-ms-original-file: 2018-07-01-preview/PolicyTrackedResources_QueryResourceGroupScopeWithFilterAndTop.json
 */
async function queryAtResourceGroupScopeUsingQueryParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const client = new PolicyInsightsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.policyTrackedResources.listQueryResultsForResourceGroup(
    "myResourceGroup",
    "default",
    {
      top: 1,
      filter:
        "PolicyAssignmentId eq '/subscriptions/fff8dfdb-fff3-fff0-fff4-fffdcbe6b2ef/resourceGroups/myResourceGroup/providers/Microsoft.Authorization/policyAssignments/myPolicyAssignment' AND TrackedResourceId eq '/subscriptions/fff8dfdb-fff3-fff0-fff4-fffdcbe6b2ef/resourceGroups/myResourceGroup/providers/Microsoft.Example/exampleResourceType/myResource/nestedResourceType/TrackedResource1'",
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await queryAtResourceGroupScope();
  await queryAtResourceGroupScopeUsingQueryParameters();
}

main().catch(console.error);
