// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to queries component policy states under subscription scope.
 *
 * @summary queries component policy states under subscription scope.
 * x-ms-original-file: 2024-10-01/ComponentPolicyStates_QuerySubscriptionScope.json
 */
async function queryLatestComponentPolicyStatesAtSubscriptionScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.componentPolicyStates.listQueryResultsForSubscription(
    "fff10b27-fff3-fff5-fff8-fffbe01e86a5",
    "latest",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to queries component policy states under subscription scope.
 *
 * @summary queries component policy states under subscription scope.
 * x-ms-original-file: 2024-10-01/ComponentPolicyStates_QuerySubscriptionScopeGroupByComponentTypeWithAggregate.json
 */
async function queryLatestComponentPolicyComplianceStateCountGroupedByComponentTypeAtSubscriptionScopeFilteredByGivenAssignment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.componentPolicyStates.listQueryResultsForSubscription(
    "e78961ba-36fe-4739-9212-e3031b4c8db7",
    "latest",
    {
      filter:
        "policyAssignmentId eq '/subscriptions/e78961ba-36fe-4739-9212-e3031b4c8db7/providers/microsoft.authorization/policyassignments/560050f83dbb4a24974323f8'",
      apply: "groupby((componentType,complianceState),aggregate($count as count))",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await queryLatestComponentPolicyStatesAtSubscriptionScope();
  await queryLatestComponentPolicyComplianceStateCountGroupedByComponentTypeAtSubscriptionScopeFilteredByGivenAssignment();
}

main().catch(console.error);
