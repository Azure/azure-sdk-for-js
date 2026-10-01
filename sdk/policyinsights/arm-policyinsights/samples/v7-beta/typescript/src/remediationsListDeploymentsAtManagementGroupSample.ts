// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all deployments for a remediation at management group scope.
 *
 * @summary gets all deployments for a remediation at management group scope.
 * x-ms-original-file: 2024-10-01/Remediations_ListDeploymentsManagementGroupScope.json
 */
async function listDeploymentsForARemediationAtManagementGroupScope(): Promise<void> {
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

async function main(): Promise<void> {
  await listDeploymentsForARemediationAtManagementGroupScope();
}

main().catch(console.error);
