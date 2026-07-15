// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to queries policy states for the resources under the subscription.
 *
 * @summary queries policy states for the resources under the subscription.
 * x-ms-original-file: 2024-10-01/PolicyStates_FilterAndAggregateOnly.json
 */
async function filterAndAggregateOnly(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForSubscription(
    "latest",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    {
      queryOptions: {
        from: new Date("2019-10-05T18:00:00Z"),
        filter: "PolicyDefinitionAction eq 'deny'",
        apply: "aggregate($count as NumDenyStates)",
      },
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy states for the resources under the subscription.
 *
 * @summary queries policy states for the resources under the subscription.
 * x-ms-original-file: 2024-10-01/PolicyStates_FilterAndGroupByWithAggregate.json
 */
async function filterAndGroupWithAggregate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForSubscription(
    "latest",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    {
      queryOptions: {
        top: 2,
        orderBy: "NumAuditDenyNonComplianceRecords desc",
        from: new Date("2019-10-05T18:00:00Z"),
        filter:
          "IsCompliant eq false and (PolicyDefinitionAction eq 'audit' or PolicyDefinitionAction eq 'deny')",
        apply:
          "groupby((PolicyAssignmentId, PolicyDefinitionId, PolicyDefinitionAction, ResourceId), aggregate($count as NumAuditDenyNonComplianceRecords))",
      },
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy states for the resources under the subscription.
 *
 * @summary queries policy states for the resources under the subscription.
 * x-ms-original-file: 2024-10-01/PolicyStates_FilterAndGroupByWithoutAggregate.json
 */
async function filterAndGroupWithoutAggregate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForSubscription(
    "latest",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    {
      queryOptions: {
        top: 2,
        from: new Date("2019-10-05T18:00:00Z"),
        filter:
          "IsCompliant eq false and (PolicyDefinitionAction ne 'audit' and PolicyDefinitionAction ne 'append')",
        apply:
          "groupby((PolicyAssignmentId, PolicyDefinitionId, PolicyDefinitionAction, ResourceId))",
      },
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy states for the resources under the subscription.
 *
 * @summary queries policy states for the resources under the subscription.
 * x-ms-original-file: 2024-10-01/PolicyStates_FilterAndMultipleGroups.json
 */
async function filterAndMultipleGroups(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForSubscription(
    "latest",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    {
      queryOptions: {
        top: 10,
        orderBy: "NumNonCompliantResources desc",
        filter: "IsCompliant eq false",
        apply:
          "groupby((PolicyAssignmentId, PolicySetDefinitionId, PolicyDefinitionId, PolicyDefinitionReferenceId, ResourceId))/groupby((PolicyAssignmentId, PolicySetDefinitionId, PolicyDefinitionId, PolicyDefinitionReferenceId), aggregate($count as NumNonCompliantResources))",
      },
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy states for the resources under the subscription.
 *
 * @summary queries policy states for the resources under the subscription.
 * x-ms-original-file: 2024-10-01/PolicyStates_QuerySubscriptionScope.json
 */
async function queryLatestAtSubscriptionScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForSubscription(
    "latest",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy states for the resources under the subscription.
 *
 * @summary queries policy states for the resources under the subscription.
 * x-ms-original-file: 2024-10-01/PolicyStates_QuerySubscriptionScopeNextLink.json
 */
async function queryLatestAtSubscriptionScopeWithNextLink(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForSubscription(
    "latest",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    { queryOptions: { skipToken: "WpmWfBSvPhkAK6QD" } },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy states for the resources under the subscription.
 *
 * @summary queries policy states for the resources under the subscription.
 * x-ms-original-file: 2024-10-01/PolicyStates_TimeRangeSortSelectTop.json
 */
async function timeRangeSortSelectAndLimit(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForSubscription(
    "latest",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    {
      queryOptions: {
        top: 2,
        orderBy:
          "Timestamp desc, PolicyAssignmentId asc, SubscriptionId asc, ResourceGroup asc, ResourceId",
        select:
          "Timestamp, PolicyAssignmentId, PolicyDefinitionId, SubscriptionId, ResourceGroup, ResourceId, policyDefinitionGroupNames",
        from: new Date("2019-10-05T18:00:00Z"),
        to: new Date("2019-10-06T18:00:00Z"),
      },
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await filterAndAggregateOnly();
  await filterAndGroupWithAggregate();
  await filterAndGroupWithoutAggregate();
  await filterAndMultipleGroups();
  await queryLatestAtSubscriptionScope();
  await queryLatestAtSubscriptionScopeWithNextLink();
  await timeRangeSortSelectAndLimit();
}

main().catch(console.error);
