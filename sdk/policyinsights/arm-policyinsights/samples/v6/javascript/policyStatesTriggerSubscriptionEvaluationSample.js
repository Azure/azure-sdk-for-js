// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Triggers a policy evaluation scan for all the resources under the subscription
 *
 * @summary Triggers a policy evaluation scan for all the resources under the subscription
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_TriggerSubscriptionEvaluation.json
 */
async function triggerEvaluationsForAllResourcesInASubscription() {
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result =
    await client.policyStates.beginTriggerSubscriptionEvaluationAndWait(subscriptionId);
  console.log(result);
}

async function main() {
  await triggerEvaluationsForAllResourcesInASubscription();
}

main().catch(console.error);
