// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to summarizes policy states for the resources under the subscription.
 *
 * @summary summarizes policy states for the resources under the subscription.
 * x-ms-original-file: 2024-10-01/PolicyStates_SummarizeSubscriptionScope.json
 */
async function summarizeAtSubscriptionScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.policyStates.summarizeForSubscription(
    "latest",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    { top: 5 },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to summarizes policy states for the resources under the subscription.
 *
 * @summary summarizes policy states for the resources under the subscription.
 * x-ms-original-file: 2024-10-01/PolicyStates_SummarizeSubscriptionScopeForPolicyGroup.json
 */
async function summarizeAtSubscriptionScopeForAPolicyDefinitionGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.policyStates.summarizeForSubscription(
    "latest",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    { top: 1, filter: "'group1' IN PolicyDefinitionGroupNames" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await summarizeAtSubscriptionScope();
  await summarizeAtSubscriptionScopeForAPolicyDefinitionGroup();
}

main().catch(console.error);
