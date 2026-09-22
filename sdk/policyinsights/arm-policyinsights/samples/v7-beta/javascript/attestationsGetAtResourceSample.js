// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an existing attestation at resource scope.
 *
 * @summary gets an existing attestation at resource scope.
 * x-ms-original-file: 2024-10-01/Attestations_GetResourceScope.json
 */
async function getAttestationAtIndividualResourceScope() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.attestations.getAtResource(
    "subscriptions/35ee058e-5fa0-414c-8145-3ebb8d09b6e2/resourcegroups/myrg/providers/microsoft.compute/virtualMachines/devVM",
    "790996e6-9871-4b1f-9cd9-ec42cd6ced1e",
  );
  console.log(result);
}

async function main() {
  await getAttestationAtIndividualResourceScope();
}

main().catch(console.error);
