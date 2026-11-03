// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to queries policy states for the subscription level policy set definition.
 *
 * @summary queries policy states for the subscription level policy set definition.
 * x-ms-original-file: 2024-10-01/PolicyStates_QuerySubscriptionLevelPolicySetDefinitionScope.json
 */
async function queryLatestAtSubscriptionLevelPolicySetDefinitionScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForPolicySetDefinition(
    "latest",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    "3e3807c1-65c9-49e0-a406-82d8ae3e338c",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy states for the subscription level policy set definition.
 *
 * @summary queries policy states for the subscription level policy set definition.
 * x-ms-original-file: 2024-10-01/PolicyStates_QuerySubscriptionLevelPolicySetDefinitionScopeNextLink.json
 */
async function queryLatestAtSubscriptionLevelPolicySetDefinitionScopeWithNextLink(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForPolicySetDefinition(
    "latest",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    "3e3807c1-65c9-49e0-a406-82d8ae3e338c",
    { queryOptions: { skipToken: "WpmWfBSvPhkAK6QD" } },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await queryLatestAtSubscriptionLevelPolicySetDefinitionScope();
  await queryLatestAtSubscriptionLevelPolicySetDefinitionScopeWithNextLink();
}

main().catch(console.error);
