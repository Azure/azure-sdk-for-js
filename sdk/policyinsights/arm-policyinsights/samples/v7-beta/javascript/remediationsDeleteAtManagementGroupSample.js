// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing remediation at management group scope.
 *
 * @summary deletes an existing remediation at management group scope.
 * x-ms-original-file: 2024-10-01/Remediations_DeleteManagementGroupScope.json
 */
async function deleteRemediationAtManagementGroupScope() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.remediations.deleteAtManagementGroup(
    "financeMg",
    "storageRemediation",
  );
  console.log(result);
}

async function main() {
  await deleteRemediationAtManagementGroupScope();
}

main().catch(console.error);
