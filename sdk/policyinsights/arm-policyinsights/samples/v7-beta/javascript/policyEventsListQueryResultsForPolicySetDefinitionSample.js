// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to queries policy events for the subscription level policy set definition.
 *
 * @summary queries policy events for the subscription level policy set definition.
 * x-ms-original-file: 2024-10-01/PolicyEvents_QuerySubscriptionLevelPolicySetDefinitionScope.json
 */
async function queryAtSubscriptionLevelPolicySetDefinitionScope() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyEvents.listQueryResultsForPolicySetDefinition(
    "default",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    "3e3807c1-65c9-49e0-a406-82d8ae3e338c",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy events for the subscription level policy set definition.
 *
 * @summary queries policy events for the subscription level policy set definition.
 * x-ms-original-file: 2024-10-01/PolicyEvents_QuerySubscriptionLevelPolicySetDefinitionScopeNextLink.json
 */
async function queryAtSubscriptionLevelPolicySetDefinitionScopeWithNextLink() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyEvents.listQueryResultsForPolicySetDefinition(
    "default",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    "3e3807c1-65c9-49e0-a406-82d8ae3e338c",
    { queryOptions: { skipToken: "WpmWfBSvPhkAK6QD" } },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await queryAtSubscriptionLevelPolicySetDefinitionScope();
  await queryAtSubscriptionLevelPolicySetDefinitionScopeWithNextLink();
}

main().catch(console.error);
