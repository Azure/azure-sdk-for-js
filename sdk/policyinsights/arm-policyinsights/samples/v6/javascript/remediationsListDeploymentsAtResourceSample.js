// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets all deployments for a remediation at resource scope.
 *
 * @summary Gets all deployments for a remediation at resource scope.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/Remediations_ListDeploymentsResourceScope.json
 */
async function listDeploymentsForARemediationAtIndividualResourceScope() {
  const resourceId =
    "subscriptions/35ee058e-5fa0-414c-8145-3ebb8d09b6e2/resourcegroups/myResourceGroup/providers/microsoft.storage/storageaccounts/storAc1";
  const remediationName = "myRemediation";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.remediations.listDeploymentsAtResource(
    resourceId,
    remediationName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listDeploymentsForARemediationAtIndividualResourceScope();
}

main().catch(console.error);
