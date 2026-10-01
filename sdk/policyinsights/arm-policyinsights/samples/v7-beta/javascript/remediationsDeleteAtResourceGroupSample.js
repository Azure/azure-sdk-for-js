// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing remediation at resource group scope.
 *
 * @summary deletes an existing remediation at resource group scope.
 * x-ms-original-file: 2024-10-01/Remediations_DeleteResourceGroupScope.json
 */
async function deleteRemediationAtResourceGroupScope() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "35ee058e-5fa0-414c-8145-3ebb8d09b6e2";
  const client = new PolicyInsightsClient(credential, subscriptionId);
  const result = await client.remediations.deleteAtResourceGroup(
    "myResourceGroup",
    "storageRemediation",
  );
  console.log(result);
}

async function main() {
  await deleteRemediationAtResourceGroupScope();
}

main().catch(console.error);
