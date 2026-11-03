// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to cancels a remediation at subscription scope.
 *
 * @summary cancels a remediation at subscription scope.
 * x-ms-original-file: 2024-10-01/Remediations_CancelSubscriptionScope.json
 */
async function cancelARemediationAtSubscriptionScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "35ee058e-5fa0-414c-8145-3ebb8d09b6e2";
  const client = new PolicyInsightsClient(credential, subscriptionId);
  const result = await client.remediations.cancelAtSubscription("myRemediation");
  console.log(result);
}

async function main(): Promise<void> {
  await cancelARemediationAtSubscriptionScope();
}

main().catch(console.error);
