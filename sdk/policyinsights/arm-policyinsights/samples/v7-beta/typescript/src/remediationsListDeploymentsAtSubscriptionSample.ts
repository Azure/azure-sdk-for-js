// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all deployments for a remediation at subscription scope.
 *
 * @summary gets all deployments for a remediation at subscription scope.
 * x-ms-original-file: 2024-10-01/Remediations_ListDeploymentsSubscriptionScope.json
 */
async function listDeploymentsForARemediationAtSubscriptionScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "35ee058e-5fa0-414c-8145-3ebb8d09b6e2";
  const client = new PolicyInsightsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.remediations.listDeploymentsAtSubscription("myRemediation")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listDeploymentsForARemediationAtSubscriptionScope();
}

main().catch(console.error);
