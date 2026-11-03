// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cancels a remediation at management group scope.
 *
 * @summary cancels a remediation at management group scope.
 * x-ms-original-file: 2024-10-01/Remediations_CancelManagementGroupScope.json
 */
async function cancelARemediationAtManagementGroupScope() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.remediations.cancelAtManagementGroup("financeMg", "myRemediation");
  console.log(result);
}

async function main() {
  await cancelARemediationAtManagementGroupScope();
}

main().catch(console.error);
