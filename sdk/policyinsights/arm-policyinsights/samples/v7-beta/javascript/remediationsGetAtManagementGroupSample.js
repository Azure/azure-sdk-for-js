// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an existing remediation at management group scope.
 *
 * @summary gets an existing remediation at management group scope.
 * x-ms-original-file: 2024-10-01/Remediations_GetManagementGroupScope.json
 */
async function getRemediationAtManagementGroupScope() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.remediations.getAtManagementGroup("financeMg", "storageRemediation");
  console.log(result);
}

async function main() {
  await getRemediationAtManagementGroupScope();
}

main().catch(console.error);
