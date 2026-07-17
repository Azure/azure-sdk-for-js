// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to queries component policy states under resource group scope.
 *
 * @summary queries component policy states under resource group scope.
 * x-ms-original-file: 2024-10-01/ComponentPolicyStates_QueryResourceGroupScope.json
 */
async function queryLatestComponentPolicyStatesAtResourceGroupScope() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.componentPolicyStates.listQueryResultsForResourceGroup(
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    "myResourceGroup",
    "latest",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to queries component policy states under resource group scope.
 *
 * @summary queries component policy states under resource group scope.
 * x-ms-original-file: 2024-10-01/ComponentPolicyStates_QueryResourceGroupScopeGroupByComponentTypeWithAggregate.json
 */
async function queryLatestComponentPolicyComplianceStateCountGroupedByComponentTypeAtResourceGroupScopeFilteredByGivenAssignment() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.componentPolicyStates.listQueryResultsForResourceGroup(
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    "myResourceGroup",
    "latest",
    {
      filter:
        "policyAssignmentId eq '/subscriptions/fffedd8f-ffff-fffd-fffd-fffed2f84852/providers/microsoft.authorization/policyassignments/560050f83dbb4a24974323f8'",
      apply: "groupby((type,complianceState),aggregate($count as count))",
    },
  );
  console.log(result);
}

async function main() {
  await queryLatestComponentPolicyStatesAtResourceGroupScope();
  await queryLatestComponentPolicyComplianceStateCountGroupedByComponentTypeAtResourceGroupScopeFilteredByGivenAssignment();
}

main().catch(console.error);
