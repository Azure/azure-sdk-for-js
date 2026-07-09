// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an existing attestation at subscription scope.
 *
 * @summary gets an existing attestation at subscription scope.
 * x-ms-original-file: 2024-10-01/Attestations_GetSubscriptionScope.json
 */
async function getAttestationAtSubscriptionScope() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "35ee058e-5fa0-414c-8145-3ebb8d09b6e2";
  const client = new PolicyInsightsClient(credential, subscriptionId);
  const result = await client.attestations.getAtSubscription(
    "790996e6-9871-4b1f-9cd9-ec42cd6ced1e",
  );
  console.log(result);
}

async function main() {
  await getAttestationAtSubscriptionScope();
}

main().catch(console.error);
