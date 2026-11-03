// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an existing attestation at individual resource scope.
 *
 * @summary deletes an existing attestation at individual resource scope.
 * x-ms-original-file: 2024-10-01/Attestations_DeleteResourceScope.json
 */
async function deleteAttestationAtIndividualResourceScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  await client.attestations.deleteAtResource(
    "subscriptions/35ee058e-5fa0-414c-8145-3ebb8d09b6e2/resourcegroups/myrg/providers/microsoft.compute/virtualMachines/devVM",
    "790996e6-9871-4b1f-9cd9-ec42cd6ced1e",
  );
}

async function main(): Promise<void> {
  await deleteAttestationAtIndividualResourceScope();
}

main().catch(console.error);
