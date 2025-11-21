// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Summarizes policy states for the resources under the subscription.
 *
 * @summary Summarizes policy states for the resources under the subscription.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_SummarizeSubscriptionScope.json
 */
async function summarizeAtSubscriptionScope() {
  const policyStatesSummaryResource = "latest";
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const top = 5;
  const options = { top };
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
async function summarizeAtSubscriptionScopeForAPolicyDefinitionGroup() {
  const policyStatesSummaryResource = "latest";
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const top = 1;
  const filter = "'group1' IN PolicyDefinitionGroupNames";
  const options = {
    top,
    filter,
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

async function main() {
  await summarizeAtSubscriptionScope();
  await summarizeAtSubscriptionScopeForAPolicyDefinitionGroup();
}

main().catch(console.error);
