// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all deployments for a remediation at resource group scope.
 *
 * @summary gets all deployments for a remediation at resource group scope.
 * x-ms-original-file: 2024-10-01/Remediations_ListDeploymentsResourceGroupScope.json
 */
async function listDeploymentsForARemediationAtResourceGroupScope() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "35ee058e-5fa0-414c-8145-3ebb8d09b6e2";
  const client = new PolicyInsightsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.remediations.listDeploymentsAtResourceGroup(
    "myResourceGroup",
    "myRemediation",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listDeploymentsForARemediationAtResourceGroupScope();
}

main().catch(console.error);
