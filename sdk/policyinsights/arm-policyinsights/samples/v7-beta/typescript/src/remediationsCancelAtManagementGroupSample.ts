// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to cancels a remediation at management group scope.
 *
 * @summary cancels a remediation at management group scope.
 * x-ms-original-file: 2024-10-01/Remediations_CancelManagementGroupScope.json
 */
async function cancelARemediationAtManagementGroupScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.remediations.cancelAtManagementGroup("financeMg", "myRemediation");
  console.log(result);
}

async function main(): Promise<void> {
  await cancelARemediationAtManagementGroupScope();
}

main().catch(console.error);
