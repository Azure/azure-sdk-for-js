// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets all deployments for a remediation at management group scope.
 *
 * @summary Gets all deployments for a remediation at management group scope.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/Remediations_ListDeploymentsManagementGroupScope.json
 */

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listDeploymentsForARemediationAtManagementGroupScope(): Promise<void> {
  const managementGroupId = "financeMg";
  const remediationName = "myRemediation";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.remediations.listDeploymentsAtManagementGroup(
    managementGroupId,
    remediationName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listDeploymentsForARemediationAtManagementGroupScope();
}

main().catch(console.error);
