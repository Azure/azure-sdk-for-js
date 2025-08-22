// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes an existing remediation at resource group scope.
 *
 * @summary Deletes an existing remediation at resource group scope.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/Remediations_DeleteResourceGroupScope.json
 */

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteRemediationAtResourceGroupScope(): Promise<void> {
  const subscriptionId =
    process.env["POLICYINSIGHTS_SUBSCRIPTION_ID"] || "35ee058e-5fa0-414c-8145-3ebb8d09b6e2";
  const resourceGroupName = process.env["POLICYINSIGHTS_RESOURCE_GROUP"] || "myResourceGroup";
  const remediationName = "storageRemediation";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential, subscriptionId);
  const result = await client.remediations.deleteAtResourceGroup(
    resourceGroupName,
    remediationName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteRemediationAtResourceGroupScope();
}

main().catch(console.error);
