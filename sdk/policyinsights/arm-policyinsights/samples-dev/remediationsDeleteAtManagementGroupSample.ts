// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes an existing remediation at management group scope.
 *
 * @summary Deletes an existing remediation at management group scope.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/Remediations_DeleteManagementGroupScope.json
 */

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteRemediationAtManagementGroupScope(): Promise<void> {
  const managementGroupId = "financeMg";
  const remediationName = "storageRemediation";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.remediations.deleteAtManagementGroup(
    managementGroupId,
    remediationName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteRemediationAtManagementGroupScope();
}

main().catch(console.error);
