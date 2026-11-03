// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a remediation at resource scope.
 *
 * @summary creates or updates a remediation at resource scope.
 * x-ms-original-file: 2024-10-01/Remediations_CreateResourceScope.json
 */
async function createRemediationAtIndividualResourceScope() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.remediations.createOrUpdateAtResource(
    "subscriptions/35ee058e-5fa0-414c-8145-3ebb8d09b6e2/resourcegroups/myResourceGroup/providers/microsoft.storage/storageaccounts/storAc1",
    "storageRemediation",
    {
      policyAssignmentId:
        "/subscriptions/35ee058e-5fa0-414c-8145-3ebb8d09b6e2/resourceGroups/myResourceGroup/providers/microsoft.authorization/policyassignments/b101830944f246d8a14088c5",
    },
  );
  console.log(result);
}

async function main() {
  await createRemediationAtIndividualResourceScope();
}

main().catch(console.error);
