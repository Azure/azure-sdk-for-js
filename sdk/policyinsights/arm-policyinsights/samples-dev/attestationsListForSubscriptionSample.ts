// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * This sample demonstrates how to Gets all attestations for the subscription.
 *
 * @summary Gets all attestations for the subscription.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/Attestations_ListSubscriptionScope.json
 */

import type { AttestationsListForSubscriptionOptionalParams } from "@azure/arm-policyinsights";
import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listAttestationsAtSubscriptionScope(): Promise<void> {
  const subscriptionId =
    process.env["POLICYINSIGHTS_SUBSCRIPTION_ID"] || "35ee058e-5fa0-414c-8145-3ebb8d09b6e2";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.attestations.listForSubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Gets all attestations for the subscription.
 *
 * @summary Gets all attestations for the subscription.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/Attestations_ListSubscriptionScope_WithQuery.json
 */
async function listAttestationsAtSubscriptionScopeWithQueryParameters(): Promise<void> {
  const subscriptionId =
    process.env["POLICYINSIGHTS_SUBSCRIPTION_ID"] || "35ee058e-5fa0-414c-8145-3ebb8d09b6e2";
  const top = 1;
  const filter =
    "PolicyAssignmentId eq '/subscriptions/35ee058e-5fa0-414c-8145-3ebb8d09b6e2/providers/microsoft.authorization/policyassignments/b101830944f246d8a14088c5' AND PolicyDefinitionReferenceId eq '0b158b46-ff42-4799-8e39-08a5c23b4551'";
  const options: AttestationsListForSubscriptionOptionalParams = {
    queryOptions: {
      top,
      filter,
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.attestations.listForSubscription(options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listAttestationsAtSubscriptionScope();
  await listAttestationsAtSubscriptionScopeWithQueryParameters();
}

main().catch(console.error);
