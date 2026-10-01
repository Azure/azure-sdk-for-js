// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to queries policy states for the resource.
 *
 * @summary queries policy states for the resource.
 * x-ms-original-file: 2024-10-01/PolicyStates_QueryNestedResourceScope.json
 */
async function queryAllPolicyStatesAtNestedResourceScope() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForResource(
    "default",
    "subscriptions/fff10b27-fff3-fff5-fff8-fffbe01e86a5/resourceGroups/myResourceGroup/providers/Microsoft.ServiceFabric/clusters/myCluster/applications/myApplication",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy states for the resource.
 *
 * @summary queries policy states for the resource.
 * x-ms-original-file: 2024-10-01/PolicyStates_QueryResourceScope.json
 */
async function queryAllPolicyStatesAtResourceScope() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForResource(
    "default",
    "subscriptions/fff10b27-fff3-fff5-fff8-fffbe01e86a5/resourceGroups/myResourceGroup/providers/Microsoft.ClassicCompute/domainNames/myDomainName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy states for the resource.
 *
 * @summary queries policy states for the resource.
 * x-ms-original-file: 2024-10-01/PolicyStates_QueryResourceScopeExpandComponents.json
 */
async function queryComponentPolicyComplianceStateAtResourceScopeFilteredByGivenAssignment() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForResource(
    "latest",
    "subscriptions/e78961ba-36fe-4739-9212-e3031b4c8db7/resourceGroups/myResourceGroup/providers/Microsoft.KeyVault/Vaults/myKVName",
    {
      queryOptions: {
        filter:
          "policyAssignmentId eq '/subscriptions/e78961ba-36fe-4739-9212-e3031b4c8db7/providers/microsoft.authorization/policyassignments/560050f83dbb4a24974323f8'",
        expand:
          "components($filter=ComplianceState eq 'NonCompliant' or ComplianceState eq 'Compliant')",
      },
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy states for the resource.
 *
 * @summary queries policy states for the resource.
 * x-ms-original-file: 2024-10-01/PolicyStates_QueryResourceScopeExpandComponentsGroupByWithAggregate.json
 */
async function queryComponentPolicyComplianceStateCountGroupedByStateTypeAtResourceScopeFilteredByGivenAssignment() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForResource(
    "latest",
    "subscriptions/e78961ba-36fe-4739-9212-e3031b4c8db7/resourceGroups/myResourceGroup/providers/Microsoft.KeyVault/Vaults/myKVName",
    {
      queryOptions: {
        filter:
          "policyAssignmentId eq '/subscriptions/e78961ba-36fe-4739-9212-e3031b4c8db7/providers/microsoft.authorization/policyassignments/560050f83dbb4a24974323f8'",
        expand:
          "components($filter=ComplianceState eq 'NonCompliant' or ComplianceState eq 'Compliant';$apply=groupby((complianceState),aggregate($count as count)))",
      },
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy states for the resource.
 *
 * @summary queries policy states for the resource.
 * x-ms-original-file: 2024-10-01/PolicyStates_QueryResourceScopeExpandPolicyEvaluationDetails.json
 */
async function queryAllPolicyStatesAtResourceScopeAndExpandPolicyEvaluationDetails() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForResource(
    "latest",
    "subscriptions/fff10b27-fff3-fff5-fff8-fffbe01e86a5/resourceGroups/myResourceGroup/providers/Microsoft.ClassicCompute/domainNames/myDomainName",
    { queryOptions: { expand: "PolicyEvaluationDetails" } },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy states for the resource.
 *
 * @summary queries policy states for the resource.
 * x-ms-original-file: 2024-10-01/PolicyStates_QueryResourceScopeNextLink.json
 */
async function queryAllPolicyStatesAtResourceScopeWithNextLink() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForResource(
    "default",
    "subscriptions/fff10b27-fff3-fff5-fff8-fffbe01e86a5/resourceGroups/myResourceGroup/providers/Microsoft.ClassicCompute/domainNames/myDomainName",
    { queryOptions: { skipToken: "WpmWfBSvPhkAK6QD" } },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy states for the resource.
 *
 * @summary queries policy states for the resource.
 * x-ms-original-file: 2024-10-01/PolicyStates_QuerySubscriptionLevelNestedResourceScope.json
 */
async function queryAllPolicyStatesAtSubscriptionLevelNestedResourceScope() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForResource(
    "default",
    "subscriptions/fff10b27-fff3-fff5-fff8-fffbe01e86a5/providers/Microsoft.SomeNamespace/someResourceType/someResource/someNestedResourceType/someNestedResource",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy states for the resource.
 *
 * @summary queries policy states for the resource.
 * x-ms-original-file: 2024-10-01/PolicyStates_QuerySubscriptionLevelResourceScope.json
 */
async function queryAllPolicyStatesAtSubscriptionLevelResourceScope() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForResource(
    "default",
    "subscriptions/fff10b27-fff3-fff5-fff8-fffbe01e86a5/providers/Microsoft.SomeNamespace/someResourceType/someResourceName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await queryAllPolicyStatesAtNestedResourceScope();
  await queryAllPolicyStatesAtResourceScope();
  await queryComponentPolicyComplianceStateAtResourceScopeFilteredByGivenAssignment();
  await queryComponentPolicyComplianceStateCountGroupedByStateTypeAtResourceScopeFilteredByGivenAssignment();
  await queryAllPolicyStatesAtResourceScopeAndExpandPolicyEvaluationDetails();
  await queryAllPolicyStatesAtResourceScopeWithNextLink();
  await queryAllPolicyStatesAtSubscriptionLevelNestedResourceScope();
  await queryAllPolicyStatesAtSubscriptionLevelResourceScope();
}

main().catch(console.error);
