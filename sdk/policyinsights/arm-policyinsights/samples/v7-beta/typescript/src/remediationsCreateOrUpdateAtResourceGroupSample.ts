// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a remediation at resource group scope.
 *
 * @summary creates or updates a remediation at resource group scope.
 * x-ms-original-file: 2024-10-01/Remediations_CreateResourceGroupScope.json
 */
async function createRemediationAtResourceGroupScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "35ee058e-5fa0-414c-8145-3ebb8d09b6e2";
  const client = new PolicyInsightsClient(credential, subscriptionId);
  const result = await client.remediations.createOrUpdateAtResourceGroup(
    "myResourceGroup",
    "storageRemediation",
    {
      policyAssignmentId:
        "/subscriptions/35ee058e-5fa0-414c-8145-3ebb8d09b6e2/resourceGroups/myResourceGroup/providers/microsoft.authorization/policyassignments/b101830944f246d8a14088c5",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createRemediationAtResourceGroupScope();
}

main().catch(console.error);
