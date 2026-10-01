// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing attestation at resource group scope.
 *
 * @summary deletes an existing attestation at resource group scope.
 * x-ms-original-file: 2024-10-01/Attestations_DeleteResourceGroupScope.json
 */
async function deleteAttestationAtResourceGroupScope() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "35ee058e-5fa0-414c-8145-3ebb8d09b6e2";
  const client = new PolicyInsightsClient(credential, subscriptionId);
  await client.attestations.deleteAtResourceGroup("myRg", "790996e6-9871-4b1f-9cd9-ec42cd6ced1e");
}

async function main() {
  await deleteAttestationAtResourceGroupScope();
}

main().catch(console.error);
