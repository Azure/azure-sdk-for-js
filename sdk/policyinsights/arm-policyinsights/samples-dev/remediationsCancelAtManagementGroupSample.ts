// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Cancels a remediation at management group scope.
 *
 * @summary Cancels a remediation at management group scope.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/Remediations_CancelManagementGroupScope.json
 */

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function cancelARemediationAtManagementGroupScope(): Promise<void> {
  const managementGroupId = "financeMg";
  const remediationName = "myRemediation";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.remediations.cancelAtManagementGroup(
    managementGroupId,
    remediationName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cancelARemediationAtManagementGroupScope();
}

main().catch(console.error);
