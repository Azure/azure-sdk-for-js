// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to queries policy events for the resource.
 *
 * @summary queries policy events for the resource.
 * x-ms-original-file: 2024-10-01/PolicyEvents_QueryNestedResourceScope.json
 */
async function queryAtNestedResourceScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyEvents.listQueryResultsForResource(
    "default",
    "subscriptions/fff10b27-fff3-fff5-fff8-fffbe01e86a5/resourceGroups/myResourceGroup/providers/Microsoft.ServiceFabric/clusters/myCluster/applications/myApplication",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy events for the resource.
 *
 * @summary queries policy events for the resource.
 * x-ms-original-file: 2024-10-01/PolicyEvents_QueryResourceScope.json
 */
async function queryAtResourceScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyEvents.listQueryResultsForResource(
    "default",
    "subscriptions/fff10b27-fff3-fff5-fff8-fffbe01e86a5/resourceGroups/myResourceGroup/providers/Microsoft.ClassicCompute/domainNames/myDomainName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy events for the resource.
 *
 * @summary queries policy events for the resource.
 * x-ms-original-file: 2024-10-01/PolicyEvents_QueryResourceScopeExpandComponents.json
 */
async function queryComponentsPolicyEventsForResourceScopeFilteredByGivenAssignment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyEvents.listQueryResultsForResource(
    "default",
    "subscriptions/e78961ba-36fe-4739-9212-e3031b4c8db7/resourceGroups/myResourceGroup/providers/Microsoft.KeyVault/Vaults/myKVName",
    {
      filter:
        "policyAssignmentId eq '/subscriptions/e78961ba-36fe-4739-9212-e3031b4c8db7/providers/microsoft.authorization/policyassignments/560050f83dbb4a24974323f8'",
      expand: "components",
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy events for the resource.
 *
 * @summary queries policy events for the resource.
 * x-ms-original-file: 2024-10-01/PolicyEvents_QueryResourceScopeExpandComponentsGroupByWithAggregate.json
 */
async function queryComponentsPolicyEventsCountGroupedByUserAndActionTypeForResourceScopeFilteredByGivenAssignment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyEvents.listQueryResultsForResource(
    "default",
    "subscriptions/e78961ba-36fe-4739-9212-e3031b4c8db7/resourceGroups/myResourceGroup/providers/Microsoft.KeyVault/Vaults/myKVName",
    {
      filter:
        "policyAssignmentId eq '/subscriptions/e78961ba-36fe-4739-9212-e3031b4c8db7/providers/microsoft.authorization/policyassignments/560050f83dbb4a24974323f8'",
      expand:
        "components($apply=groupby((tenantId, principalOid, policyDefinitionAction), aggregate($count as totalActions)))",
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy events for the resource.
 *
 * @summary queries policy events for the resource.
 * x-ms-original-file: 2024-10-01/PolicyEvents_QueryResourceScopeNextLink.json
 */
async function queryAtResourceScopeWithNextLink(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyEvents.listQueryResultsForResource(
    "default",
    "subscriptions/fff10b27-fff3-fff5-fff8-fffbe01e86a5/resourceGroups/myResourceGroup/providers/Microsoft.ClassicCompute/domainNames/myDomainName",
    { skipToken: "WpmWfBSvPhkAK6QD" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy events for the resource.
 *
 * @summary queries policy events for the resource.
 * x-ms-original-file: 2024-10-01/PolicyEvents_QuerySubscriptionLevelNestedResourceScope.json
 */
async function queryAtSubscriptionLevelNestedResourceScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyEvents.listQueryResultsForResource(
    "default",
    "subscriptions/fff10b27-fff3-fff5-fff8-fffbe01e86a5/providers/Microsoft.SomeNamespace/someResourceType/someResource/someNestedResourceType/someNestedResource",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy events for the resource.
 *
 * @summary queries policy events for the resource.
 * x-ms-original-file: 2024-10-01/PolicyEvents_QuerySubscriptionLevelResourceScope.json
 */
async function queryAtSubscriptionLevelResourceScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyEvents.listQueryResultsForResource(
    "default",
    "subscriptions/fff10b27-fff3-fff5-fff8-fffbe01e86a5/providers/Microsoft.SomeNamespace/someResourceType/someResourceName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await queryAtNestedResourceScope();
  await queryAtResourceScope();
  await queryComponentsPolicyEventsForResourceScopeFilteredByGivenAssignment();
  await queryComponentsPolicyEventsCountGroupedByUserAndActionTypeForResourceScopeFilteredByGivenAssignment();
  await queryAtResourceScopeWithNextLink();
  await queryAtSubscriptionLevelNestedResourceScope();
  await queryAtSubscriptionLevelResourceScope();
}

main().catch(console.error);
