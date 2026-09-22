// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing attestation at subscription scope.
 *
 * @summary deletes an existing attestation at subscription scope.
 * x-ms-original-file: 2024-10-01/Attestations_DeleteSubscriptionScope.json
 */
async function deleteAttestationAtSubscriptionScope() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "35ee058e-5fa0-414c-8145-3ebb8d09b6e2";
  const client = new PolicyInsightsClient(credential, subscriptionId);
  await client.attestations.deleteAtSubscription("790996e6-9871-4b1f-9cd9-ec42cd6ced1e");
}

async function main() {
  await deleteAttestationAtSubscriptionScope();
}

main().catch(console.error);
