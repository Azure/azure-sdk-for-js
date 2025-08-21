// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * This sample demonstrates how to Summarizes policy states for the resources under the subscription.
 *
 * @summary Summarizes policy states for the resources under the subscription.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_SummarizeSubscriptionScope.json
 */

import type { PolicyStatesSummarizeForSubscriptionOptionalParams } from "@azure/arm-policyinsights";
import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function summarizeAtSubscriptionScope(): Promise<void> {
  const policyStatesSummaryResource = "latest";
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const top = 5;
  const options: PolicyStatesSummarizeForSubscriptionOptionalParams = {
    queryOptions: {
      top,
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.policyStates.summarizeForSubscription(
    policyStatesSummaryResource,
    subscriptionId,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Summarizes policy states for the resources under the subscription.
 *
 * @summary Summarizes policy states for the resources under the subscription.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_SummarizeSubscriptionScopeForPolicyGroup.json
 */
async function summarizeAtSubscriptionScopeForAPolicyDefinitionGroup(): Promise<void> {
  const policyStatesSummaryResource = "latest";
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const top = 1;
  const filter = "'group1' IN PolicyDefinitionGroupNames";
  const options: PolicyStatesSummarizeForSubscriptionOptionalParams = {
    queryOptions: {
      top,
      filter,
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.policyStates.summarizeForSubscription(
    policyStatesSummaryResource,
    subscriptionId,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await summarizeAtSubscriptionScope();
  await summarizeAtSubscriptionScopeForAPolicyDefinitionGroup();
}

main().catch(console.error);
