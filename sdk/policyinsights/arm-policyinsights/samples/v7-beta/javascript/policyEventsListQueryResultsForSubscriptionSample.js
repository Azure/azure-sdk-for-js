// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to queries policy events for the resources under the subscription.
 *
 * @summary queries policy events for the resources under the subscription.
 * x-ms-original-file: 2024-10-01/PolicyEvents_FilterAndAggregateOnly.json
 */
async function filterAndAggregateOnly() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyEvents.listQueryResultsForSubscription(
    "default",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    {
      queryOptions: {
        from: new Date("2018-02-05T18:00:00Z"),
        filter: "PolicyDefinitionAction eq 'deny'",
        apply: "aggregate($count as NumDenyEvents)",
      },
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy events for the resources under the subscription.
 *
 * @summary queries policy events for the resources under the subscription.
 * x-ms-original-file: 2024-10-01/PolicyEvents_FilterAndGroupByWithAggregate.json
 */
async function filterAndGroupWithAggregate() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyEvents.listQueryResultsForSubscription(
    "default",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    {
      queryOptions: {
        top: 2,
        from: new Date("2018-02-05T18:00:00Z"),
        filter: "PolicyDefinitionAction eq 'audit' or PolicyDefinitionAction eq 'deny'",
        apply:
          "groupby((PolicyAssignmentId, PolicyDefinitionId, PolicyDefinitionAction, ResourceId), aggregate($count as NumEvents))",
      },
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy events for the resources under the subscription.
 *
 * @summary queries policy events for the resources under the subscription.
 * x-ms-original-file: 2024-10-01/PolicyEvents_FilterAndGroupByWithoutAggregate.json
 */
async function filterAndGroupWithoutAggregate() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyEvents.listQueryResultsForSubscription(
    "default",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    {
      queryOptions: {
        top: 2,
        from: new Date("2018-01-05T18:00:00Z"),
        filter: "PolicyDefinitionAction ne 'audit' and PolicyDefinitionAction ne 'append'",
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
 * This sample demonstrates how to queries policy events for the resources under the subscription.
 *
 * @summary queries policy events for the resources under the subscription.
 * x-ms-original-file: 2024-10-01/PolicyEvents_FilterAndMultipleGroups.json
 */
async function filterAndMultipleGroups() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyEvents.listQueryResultsForSubscription(
    "default",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    {
      queryOptions: {
        top: 10,
        orderBy: "NumDeniedResources desc",
        from: new Date("2018-01-01T00:00:00Z"),
        filter: "PolicyDefinitionAction eq 'deny'",
        apply:
          "groupby((PolicyAssignmentId, PolicyDefinitionId, ResourceId))/groupby((PolicyAssignmentId, PolicyDefinitionId), aggregate($count as NumDeniedResources))",
      },
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy events for the resources under the subscription.
 *
 * @summary queries policy events for the resources under the subscription.
 * x-ms-original-file: 2024-10-01/PolicyEvents_QuerySubscriptionScope.json
 */
async function queryAtSubscriptionScope() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyEvents.listQueryResultsForSubscription(
    "default",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy events for the resources under the subscription.
 *
 * @summary queries policy events for the resources under the subscription.
 * x-ms-original-file: 2024-10-01/PolicyEvents_QuerySubscriptionScopeNextLink.json
 */
async function queryAtSubscriptionScopeWithNextLink() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyEvents.listQueryResultsForSubscription(
    "default",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    { queryOptions: { skipToken: "WpmWfBSvPhkAK6QD" } },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy events for the resources under the subscription.
 *
 * @summary queries policy events for the resources under the subscription.
 * x-ms-original-file: 2024-10-01/PolicyEvents_TimeRangeSortSelectTop.json
 */
async function timeRangeSortSelectAndLimit() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyEvents.listQueryResultsForSubscription(
    "default",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    {
      queryOptions: {
        top: 2,
        orderBy:
          "Timestamp desc, PolicyAssignmentId asc, SubscriptionId asc, ResourceGroup asc, ResourceId",
        select:
          "Timestamp, PolicyAssignmentId, PolicyDefinitionId, SubscriptionId, ResourceGroup, ResourceId",
        from: new Date("2018-02-05T18:00:00Z"),
        to: new Date("2018-02-06T18:00:00Z"),
      },
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await filterAndAggregateOnly();
  await filterAndGroupWithAggregate();
  await filterAndGroupWithoutAggregate();
  await filterAndMultipleGroups();
  await queryAtSubscriptionScope();
  await queryAtSubscriptionScopeWithNextLink();
  await timeRangeSortSelectAndLimit();
}

main().catch(console.error);
