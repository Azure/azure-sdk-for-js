// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cancels a remediation at subscription scope.
 *
 * @summary cancels a remediation at subscription scope.
 * x-ms-original-file: 2024-10-01/Remediations_CancelSubscriptionScope.json
 */
async function cancelARemediationAtSubscriptionScope() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "35ee058e-5fa0-414c-8145-3ebb8d09b6e2";
  const client = new PolicyInsightsClient(credential, subscriptionId);
  const result = await client.remediations.cancelAtSubscription("myRemediation");
  console.log(result);
}

async function main() {
  await cancelARemediationAtSubscriptionScope();
}

main().catch(console.error);
