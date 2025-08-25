// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * This sample demonstrates how to Queries policy states for the subscription level policy set definition.
 *
 * @summary Queries policy states for the subscription level policy set definition.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_QuerySubscriptionLevelPolicySetDefinitionScope.json
 */

import type { PolicyStatesListQueryResultsForPolicySetDefinitionOptionalParams } from "@azure/arm-policyinsights";
import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function queryLatestAtSubscriptionLevelPolicySetDefinitionScope(): Promise<void> {
  const policyStatesResource = "latest";
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const policySetDefinitionName = "3e3807c1-65c9-49e0-a406-82d8ae3e338c";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForPolicySetDefinition(
    policyStatesResource,
    subscriptionId,
    policySetDefinitionName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Queries policy states for the subscription level policy set definition.
 *
 * @summary Queries policy states for the subscription level policy set definition.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_QuerySubscriptionLevelPolicySetDefinitionScopeNextLink.json
 */
async function queryLatestAtSubscriptionLevelPolicySetDefinitionScopeWithNextLink(): Promise<void> {
  const policyStatesResource = "latest";
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const policySetDefinitionName = "3e3807c1-65c9-49e0-a406-82d8ae3e338c";
  const skipToken = "WpmWfBSvPhkAK6QD";
  const options: PolicyStatesListQueryResultsForPolicySetDefinitionOptionalParams = {
    queryOptions: { skipToken },
  };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForPolicySetDefinition(
    policyStatesResource,
    subscriptionId,
    policySetDefinitionName,
    options,
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
