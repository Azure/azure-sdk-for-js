// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Queries policy states for the resources under the subscription.
 *
 * @summary Queries policy states for the resources under the subscription.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_FilterAndAggregateOnly.json
 */
async function filterAndAggregateOnly() {
  const policyStatesResource = "latest";
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const fromParam = new Date("2019-10-05T18:00:00Z");
  const filter = "PolicyDefinitionAction eq 'deny'";
  const apply = "aggregate($count as NumDenyStates)";
  const options = {
    fromParam,
    filter,
    apply,
  };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.policyStates.listQueryResultsForSubscription(
    policyStatesResource,
    subscriptionId,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Queries policy states for the resources under the subscription.
 *
 * @summary Queries policy states for the resources under the subscription.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_FilterAndGroupByWithAggregate.json
 */
async function filterAndGroupWithAggregate() {
  const policyStatesResource = "latest";
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const top = 2;
  const orderBy = "NumAuditDenyNonComplianceRecords desc";
  const fromParam = new Date("2019-10-05T18:00:00Z");
  const filter =
    "IsCompliant eq false and (PolicyDefinitionAction eq 'audit' or PolicyDefinitionAction eq 'deny')";
  const apply =
    "groupby((PolicyAssignmentId, PolicyDefinitionId, PolicyDefinitionAction, ResourceId), aggregate($count as NumAuditDenyNonComplianceRecords))";
  const options = {
    top,
    orderBy,
    fromParam,
    filter,
    apply,
  };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.policyStates.listQueryResultsForSubscription(
    policyStatesResource,
    subscriptionId,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Queries policy states for the resources under the subscription.
 *
 * @summary Queries policy states for the resources under the subscription.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_FilterAndGroupByWithoutAggregate.json
 */
async function filterAndGroupWithoutAggregate() {
  const policyStatesResource = "latest";
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const top = 2;
  const fromParam = new Date("2019-10-05T18:00:00Z");
  const filter =
    "IsCompliant eq false and (PolicyDefinitionAction ne 'audit' and PolicyDefinitionAction ne 'append')";
  const apply =
    "groupby((PolicyAssignmentId, PolicyDefinitionId, PolicyDefinitionAction, ResourceId))";
  const options = {
    top,
    fromParam,
    filter,
    apply,
  };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.policyStates.listQueryResultsForSubscription(
    policyStatesResource,
    subscriptionId,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Queries policy states for the resources under the subscription.
 *
 * @summary Queries policy states for the resources under the subscription.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_FilterAndMultipleGroups.json
 */
async function filterAndMultipleGroups() {
  const policyStatesResource = "latest";
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const top = 10;
  const orderBy = "NumNonCompliantResources desc";
  const filter = "IsCompliant eq false";
  const apply =
    "groupby((PolicyAssignmentId, PolicySetDefinitionId, PolicyDefinitionId, PolicyDefinitionReferenceId, ResourceId))/groupby((PolicyAssignmentId, PolicySetDefinitionId, PolicyDefinitionId, PolicyDefinitionReferenceId), aggregate($count as NumNonCompliantResources))";
  const options = {
    top,
    orderBy,
    filter,
    apply,
  };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.policyStates.listQueryResultsForSubscription(
    policyStatesResource,
    subscriptionId,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Queries policy states for the resources under the subscription.
 *
 * @summary Queries policy states for the resources under the subscription.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_QuerySubscriptionScope.json
 */
async function queryLatestAtSubscriptionScope() {
  const policyStatesResource = "latest";
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.policyStates.listQueryResultsForSubscription(
    policyStatesResource,
    subscriptionId,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Queries policy states for the resources under the subscription.
 *
 * @summary Queries policy states for the resources under the subscription.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_QuerySubscriptionScopeNextLink.json
 */
async function queryLatestAtSubscriptionScopeWithNextLink() {
  const policyStatesResource = "latest";
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const skipToken = "WpmWfBSvPhkAK6QD";
  const options = {
    skipToken,
  };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.policyStates.listQueryResultsForSubscription(
    policyStatesResource,
    subscriptionId,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Queries policy states for the resources under the subscription.
 *
 * @summary Queries policy states for the resources under the subscription.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_TimeRangeSortSelectTop.json
 */
async function timeRangeSortSelectAndLimit() {
  const policyStatesResource = "latest";
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const top = 2;
  const orderBy =
    "Timestamp desc, PolicyAssignmentId asc, SubscriptionId asc, ResourceGroup asc, ResourceId";
  const select =
    "Timestamp, PolicyAssignmentId, PolicyDefinitionId, SubscriptionId, ResourceGroup, ResourceId, policyDefinitionGroupNames";
  const fromParam = new Date("2019-10-05T18:00:00Z");
  const to = new Date("2019-10-06T18:00:00Z");
  const options = {
    top,
    orderBy,
    select,
    fromParam,
    to,
  };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.policyStates.listQueryResultsForSubscription(
    policyStatesResource,
    subscriptionId,
    options,
  );
  console.log(result);
}

async function main() {
  await filterAndAggregateOnly();
  await filterAndGroupWithAggregate();
  await filterAndGroupWithoutAggregate();
  await filterAndMultipleGroups();
  await queryLatestAtSubscriptionScope();
  await queryLatestAtSubscriptionScopeWithNextLink();
  await timeRangeSortSelectAndLimit();
}

main().catch(console.error);
