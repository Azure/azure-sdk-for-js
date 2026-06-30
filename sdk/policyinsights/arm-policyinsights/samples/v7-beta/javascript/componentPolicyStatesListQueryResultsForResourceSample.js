// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to queries component policy states for the resource.
 *
 * @summary queries component policy states for the resource.
 * x-ms-original-file: 2024-10-01/ComponentPolicyStates_QueryNestedResourceScope.json
 */
async function queryLatestComponentPolicyStatesAtNestedResourceScope() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.componentPolicyStates.listQueryResultsForResource(
    "subscriptions/fff10b27-fff3-fff5-fff8-fffbe01e86a5/resourceGroups/myResourceGroup/providers/Microsoft.KeyVault/vaults/myVault",
    "latest",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to queries component policy states for the resource.
 *
 * @summary queries component policy states for the resource.
 * x-ms-original-file: 2024-10-01/ComponentPolicyStates_QueryResourceScope.json
 */
async function queryLatestComponentPolicyStatesAtResourceScope() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.componentPolicyStates.listQueryResultsForResource(
    "subscriptions/fff10b27-fff3-fff5-fff8-fffbe01e86a5/resourceGroups/myResourceGroup/providers/Microsoft.KeyVault/Vaults/myKVName",
    "latest",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to queries component policy states for the resource.
 *
 * @summary queries component policy states for the resource.
 * x-ms-original-file: 2024-10-01/ComponentPolicyStates_QueryResourceScopeExpandPolicyEvaluationDetails.json
 */
async function queryLatestComponentPolicyStatesAtResourceScopeAndExpandPolicyEvaluationDetails() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.componentPolicyStates.listQueryResultsForResource(
    "subscriptions/fff10b27-fff3-fff5-fff8-fffbe01e86a5/resourceGroups/myResourceGroup/providers/Microsoft.ContainerService/managedClusters/myCluster",
    "latest",
    {
      filter:
        "componentType eq 'pod' AND componentId eq 'default/test-pod' AND componentName eq 'test-pod'",
      expand: "PolicyEvaluationDetails",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to queries component policy states for the resource.
 *
 * @summary queries component policy states for the resource.
 * x-ms-original-file: 2024-10-01/ComponentPolicyStates_QueryResourceScopeFilterByComponentId.json
 */
async function queryLatestComponentPolicyComplianceStateAtResourceScopeFilteredByGivenComponentId() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.componentPolicyStates.listQueryResultsForResource(
    "subscriptions/fff10b27-fff3-fff5-fff8-fffbe01e86a5/resourceGroups/myResourceGroup/providers/Microsoft.KeyVault/Vaults/myKVName",
    "latest",
    { filter: "componentId eq cert-RSA-cert-3" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to queries component policy states for the resource.
 *
 * @summary queries component policy states for the resource.
 * x-ms-original-file: 2024-10-01/ComponentPolicyStates_QueryResourceScopeGroupByComponentTypeWithAggregate.json
 */
async function queryLatestComponentPolicyComplianceStateCountGroupedByComponentTypeAtResourceScopeFilteredByGivenAssignment() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.componentPolicyStates.listQueryResultsForResource(
    "subscriptions/e78961ba-36fe-4739-9212-e3031b4c8db7/resourceGroups/myResourceGroup/providers/Microsoft.KeyVault/Vaults/myKVName",
    "latest",
    {
      filter:
        "policyAssignmentId eq '/subscriptions/e78961ba-36fe-4739-9212-e3031b4c8db7/providers/microsoft.authorization/policyassignments/560050f83dbb4a24974323f8'",
      apply: "groupby((componentType,complianceState),aggregate($count as count))",
    },
  );
  console.log(result);
}

async function main() {
  await queryLatestComponentPolicyStatesAtNestedResourceScope();
  await queryLatestComponentPolicyStatesAtResourceScope();
  await queryLatestComponentPolicyStatesAtResourceScopeAndExpandPolicyEvaluationDetails();
  await queryLatestComponentPolicyComplianceStateAtResourceScopeFilteredByGivenComponentId();
  await queryLatestComponentPolicyComplianceStateCountGroupedByComponentTypeAtResourceScopeFilteredByGivenAssignment();
}

main().catch(console.error);
