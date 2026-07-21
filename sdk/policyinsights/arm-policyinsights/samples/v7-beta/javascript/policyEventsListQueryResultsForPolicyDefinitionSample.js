// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to queries policy events for the subscription level policy definition.
 *
 * @summary queries policy events for the subscription level policy definition.
 * x-ms-original-file: 2024-10-01/PolicyEvents_QuerySubscriptionLevelPolicyDefinitionScope.json
 */
async function queryAtSubscriptionLevelPolicyDefinitionScope() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyEvents.listQueryResultsForPolicyDefinition(
    "default",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    "24813039-7534-408a-9842-eb99f45721b1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy events for the subscription level policy definition.
 *
 * @summary queries policy events for the subscription level policy definition.
 * x-ms-original-file: 2024-10-01/PolicyEvents_QuerySubscriptionLevelPolicyDefinitionScopeNextLink.json
 */
async function queryAtSubscriptionLevelPolicyDefinitionScopeWithNextLink() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyEvents.listQueryResultsForPolicyDefinition(
    "default",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    "24813039-7534-408a-9842-eb99f45721b1",
    { queryOptions: { skipToken: "WpmWfBSvPhkAK6QD" } },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await queryAtSubscriptionLevelPolicyDefinitionScope();
  await queryAtSubscriptionLevelPolicyDefinitionScopeWithNextLink();
}

main().catch(console.error);
