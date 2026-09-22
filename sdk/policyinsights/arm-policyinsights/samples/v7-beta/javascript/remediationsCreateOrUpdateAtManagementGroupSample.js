// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a remediation at management group scope.
 *
 * @summary creates or updates a remediation at management group scope.
 * x-ms-original-file: 2024-10-01/Remediations_CreateManagementGroupScope.json
 */
async function createRemediationAtManagementGroupScope() {
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

async function main() {
  await createRemediationAtManagementGroupScope();
}

main().catch(console.error);
