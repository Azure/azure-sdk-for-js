// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to triggers a policy evaluation scan for all the resources under the subscription
 *
 * @summary triggers a policy evaluation scan for all the resources under the subscription
 * x-ms-original-file: 2024-10-01/PolicyStates_TriggerSubscriptionEvaluation.json
 */
async function triggerEvaluationsForAllResourcesInASubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  await client.policyStates.triggerSubscriptionEvaluation("fffedd8f-ffff-fffd-fffd-fffed2f84852");
}

async function main(): Promise<void> {
  await triggerEvaluationsForAllResourcesInASubscription();
}

main().catch(console.error);
