// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cancel a remediation at resource scope.
 *
 * @summary cancel a remediation at resource scope.
 * x-ms-original-file: 2024-10-01/Remediations_CancelResourceScope.json
 */
async function cancelARemediationAtIndividualResourceScope() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.remediations.cancelAtResource(
    "subscriptions/35ee058e-5fa0-414c-8145-3ebb8d09b6e2/resourcegroups/myResourceGroup/providers/microsoft.storage/storageaccounts/storAc1",
    "myRemediation",
  );
  console.log(result);
}

async function main() {
  await cancelARemediationAtIndividualResourceScope();
}

main().catch(console.error);
