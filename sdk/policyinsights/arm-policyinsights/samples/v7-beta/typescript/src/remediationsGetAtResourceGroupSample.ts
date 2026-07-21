// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an existing remediation at resource group scope.
 *
 * @summary gets an existing remediation at resource group scope.
 * x-ms-original-file: 2024-10-01/Remediations_GetResourceGroupScope.json
 */
async function getRemediationAtResourceGroupScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "35ee058e-5fa0-414c-8145-3ebb8d09b6e2";
  const client = new PolicyInsightsClient(credential, subscriptionId);
  const result = await client.remediations.getAtResourceGroup(
    "myResourceGroup",
    "storageRemediation",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getRemediationAtResourceGroupScope();
}

main().catch(console.error);
