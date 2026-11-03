// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to cancel a remediation at resource scope.
 *
 * @summary cancel a remediation at resource scope.
 * x-ms-original-file: 2024-10-01/Remediations_CancelResourceScope.json
 */
async function cancelARemediationAtIndividualResourceScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.remediations.cancelAtResource(
    "subscriptions/35ee058e-5fa0-414c-8145-3ebb8d09b6e2/resourcegroups/myResourceGroup/providers/microsoft.storage/storageaccounts/storAc1",
    "myRemediation",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cancelARemediationAtIndividualResourceScope();
}

main().catch(console.error);
