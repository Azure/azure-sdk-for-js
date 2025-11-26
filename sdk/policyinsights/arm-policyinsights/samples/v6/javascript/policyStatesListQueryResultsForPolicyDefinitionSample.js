// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Queries policy states for the subscription level policy definition.
 *
 * @summary Queries policy states for the subscription level policy definition.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_QuerySubscriptionLevelPolicyDefinitionScope.json
 */
async function queryLatestAtSubscriptionLevelPolicyDefinitionScope() {
  const policyStatesResource = "latest";
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const policyDefinitionName = "24813039-7534-408a-9842-eb99f45721b1";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.policyStates.listQueryResultsForPolicyDefinition(
    policyStatesResource,
    subscriptionId,
    policyDefinitionName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Queries policy states for the subscription level policy definition.
 *
 * @summary Queries policy states for the subscription level policy definition.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_QuerySubscriptionLevelPolicyDefinitionScopeNextLink.json
 */
async function queryLatestAtSubscriptionLevelPolicyDefinitionScopeWithNextLink() {
  const policyStatesResource = "latest";
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const policyDefinitionName = "24813039-7534-408a-9842-eb99f45721b1";
  const skipToken = "WpmWfBSvPhkAK6QD";
  const options = { queryOptions: { skipToken } };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.policyStates.listQueryResultsForPolicyDefinition(
    policyStatesResource,
    subscriptionId,
    policyDefinitionName,
    options,
  );
  console.log(result);
}

async function main() {
  await queryLatestAtSubscriptionLevelPolicyDefinitionScope();
  await queryLatestAtSubscriptionLevelPolicyDefinitionScopeWithNextLink();
}

main().catch(console.error);
