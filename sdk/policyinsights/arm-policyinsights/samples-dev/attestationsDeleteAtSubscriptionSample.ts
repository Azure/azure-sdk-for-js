// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes an existing attestation at subscription scope.
 *
 * @summary Deletes an existing attestation at subscription scope.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/Attestations_DeleteSubscriptionScope.json
 */

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteAttestationAtSubscriptionScope(): Promise<void> {
  const subscriptionId =
    process.env["POLICYINSIGHTS_SUBSCRIPTION_ID"] || "35ee058e-5fa0-414c-8145-3ebb8d09b6e2";
  const attestationName = "790996e6-9871-4b1f-9cd9-ec42cd6ced1e";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential, subscriptionId);
  const result = await client.attestations.deleteAtSubscription(attestationName);
  console.log(result);
}

async function main(): Promise<void> {
  await deleteAttestationAtSubscriptionScope();
}

main().catch(console.error);
