// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates a remediation at management group scope.
 *
 * @summary Creates or updates a remediation at management group scope.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/Remediations_CreateManagementGroupScope.json
 */
async function createRemediationAtManagementGroupScope() {
  const managementGroupId = "financeMg";
  const remediationName = "storageRemediation";
  const parameters = {
    policyAssignmentId:
      "/providers/microsoft.management/managementGroups/financeMg/providers/microsoft.authorization/policyassignments/b101830944f246d8a14088c5",
  };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.remediations.createOrUpdateAtManagementGroup(
    managementGroupId,
    remediationName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createRemediationAtManagementGroupScope();
}

main().catch(console.error);
