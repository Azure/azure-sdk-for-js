// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a remediation at management group scope.
 *
 * @summary creates or updates a remediation at management group scope.
 * x-ms-original-file: 2024-10-01/Remediations_CreateManagementGroupScope.json
 */
async function createRemediationAtManagementGroupScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.remediations.createOrUpdateAtManagementGroup(
    "financeMg",
    "storageRemediation",
    {
      policyAssignmentId:
        "/providers/microsoft.management/managementGroups/financeMg/providers/microsoft.authorization/policyassignments/b101830944f246d8a14088c5",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createRemediationAtManagementGroupScope();
}

main().catch(console.error);
