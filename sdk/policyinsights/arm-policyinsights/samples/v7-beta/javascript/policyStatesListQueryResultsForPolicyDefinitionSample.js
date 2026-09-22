// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to queries policy states for the subscription level policy definition.
 *
 * @summary queries policy states for the subscription level policy definition.
 * x-ms-original-file: 2024-10-01/PolicyStates_QuerySubscriptionLevelPolicyDefinitionScope.json
 */
async function queryLatestAtSubscriptionLevelPolicyDefinitionScope() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForPolicyDefinition(
    "latest",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    "24813039-7534-408a-9842-eb99f45721b1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy states for the subscription level policy definition.
 *
 * @summary queries policy states for the subscription level policy definition.
 * x-ms-original-file: 2024-10-01/PolicyStates_QuerySubscriptionLevelPolicyDefinitionScopeNextLink.json
 */
async function queryLatestAtSubscriptionLevelPolicyDefinitionScopeWithNextLink() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForPolicyDefinition(
    "latest",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    "24813039-7534-408a-9842-eb99f45721b1",
    { queryOptions: { skipToken: "WpmWfBSvPhkAK6QD" } },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await queryLatestAtSubscriptionLevelPolicyDefinitionScope();
  await queryLatestAtSubscriptionLevelPolicyDefinitionScopeWithNextLink();
}

main().catch(console.error);
