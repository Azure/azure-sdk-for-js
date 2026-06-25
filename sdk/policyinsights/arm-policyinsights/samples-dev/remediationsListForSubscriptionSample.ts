// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all remediations for the subscription.
 *
 * @summary gets all remediations for the subscription.
 * x-ms-original-file: 2024-10-01/Remediations_ListSubscriptionScope.json
 */
async function listRemediationsAtSubscriptionScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "35ee058e-5fa0-414c-8145-3ebb8d09b6e2";
  const client = new PolicyInsightsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.remediations.listForSubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets all remediations for the subscription.
 *
 * @summary gets all remediations for the subscription.
 * x-ms-original-file: 2024-10-01/Remediations_ListSubscriptionScope_WithQuery.json
 */
async function listRemediationsAtSubscriptionScopeWithQueryParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "35ee058e-5fa0-414c-8145-3ebb8d09b6e2";
  const client = new PolicyInsightsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.remediations.listForSubscription({
    top: 1,
    filter:
      "PolicyAssignmentId eq '/subscriptions/35ee058e-5fa0-414c-8145-3ebb8d09b6e2/providers/microsoft.authorization/policyassignments/b101830944f246d8a14088c5' AND PolicyDefinitionReferenceId eq 'storageSkuDef'",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listRemediationsAtSubscriptionScope();
  await listRemediationsAtSubscriptionScopeWithQueryParameters();
}

main().catch(console.error);
