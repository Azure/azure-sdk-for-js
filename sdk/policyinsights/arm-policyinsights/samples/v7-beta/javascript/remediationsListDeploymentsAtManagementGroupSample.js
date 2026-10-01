// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all deployments for a remediation at management group scope.
 *
 * @summary gets all deployments for a remediation at management group scope.
 * x-ms-original-file: 2024-10-01/Remediations_ListDeploymentsManagementGroupScope.json
 */
async function listDeploymentsForARemediationAtManagementGroupScope() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.remediations.listDeploymentsAtManagementGroup(
    "financeMg",
    "myRemediation",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listDeploymentsForARemediationAtManagementGroupScope();
}

main().catch(console.error);
