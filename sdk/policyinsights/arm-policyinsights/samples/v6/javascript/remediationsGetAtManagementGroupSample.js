// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets an existing remediation at management group scope.
 *
 * @summary Gets an existing remediation at management group scope.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/Remediations_GetManagementGroupScope.json
 */
async function getRemediationAtManagementGroupScope() {
  const managementGroupId = "financeMg";
  const remediationName = "storageRemediation";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.remediations.getAtManagementGroup(managementGroupId, remediationName);
  console.log(result);
}

async function main() {
  await getRemediationAtManagementGroupScope();
}

main().catch(console.error);
