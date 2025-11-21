// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Queries policy events for the subscription level policy definition.
 *
 * @summary Queries policy events for the subscription level policy definition.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyEvents_QuerySubscriptionLevelPolicyDefinitionScope.json
 */
async function queryAtSubscriptionLevelPolicyDefinitionScope() {
  const policyEventsResource = "default";
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const policyDefinitionName = "24813039-7534-408a-9842-eb99f45721b1";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyEvents.listQueryResultsForPolicyDefinition(
    policyEventsResource,
    subscriptionId,
    policyDefinitionName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Queries policy events for the subscription level policy definition.
 *
 * @summary Queries policy events for the subscription level policy definition.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyEvents_QuerySubscriptionLevelPolicyDefinitionScopeNextLink.json
 */
async function queryAtSubscriptionLevelPolicyDefinitionScopeWithNextLink() {
  const policyEventsResource = "default";
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const policyDefinitionName = "24813039-7534-408a-9842-eb99f45721b1";
  const skipToken = "WpmWfBSvPhkAK6QD";
  const options = { skipToken };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyEvents.listQueryResultsForPolicyDefinition(
    policyEventsResource,
    subscriptionId,
    policyDefinitionName,
    options,
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
