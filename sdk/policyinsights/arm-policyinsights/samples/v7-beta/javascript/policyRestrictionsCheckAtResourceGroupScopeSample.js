// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to checks what restrictions Azure Policy will place on a resource within a resource group. Use this when the resource group the resource will be created in is already known.
 *
 * @summary checks what restrictions Azure Policy will place on a resource within a resource group. Use this when the resource group the resource will be created in is already known.
 * x-ms-original-file: 2024-10-01/PolicyRestrictions_CheckAtResourceGroupScope.json
 */
async function checkPolicyRestrictionsAtResourceGroupScope() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "35ee058e-5fa0-414c-8145-3ebb8d09b6e2";
  const client = new PolicyInsightsClient(credential, subscriptionId);
  const result = await client.policyRestrictions.checkAtResourceGroupScope("vmRg", {
    pendingFields: [
      { field: "name", values: ["myVMName"] },
      { field: "location", values: ["eastus", "westus", "westus2", "westeurope"] },
      { field: "tags" },
    ],
    resourceDetails: {
      apiVersion: "2019-12-01",
      resourceContent: {
        type: "Microsoft.Compute/virtualMachines",
        properties: { priority: "Spot" },
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to checks what restrictions Azure Policy will place on a resource within a resource group. Use this when the resource group the resource will be created in is already known.
 *
 * @summary checks what restrictions Azure Policy will place on a resource within a resource group. Use this when the resource group the resource will be created in is already known.
 * x-ms-original-file: 2024-10-01/PolicyRestrictions_CheckAtResourceGroupScopeIncludeAuditEffect.json
 */
async function checkPolicyRestrictionsAtResourceGroupScopeIncludingAuditEffect() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "35ee058e-5fa0-414c-8145-3ebb8d09b6e2";
  const client = new PolicyInsightsClient(credential, subscriptionId);
  const result = await client.policyRestrictions.checkAtResourceGroupScope("vmRg", {
    includeAuditEffect: true,
    pendingFields: [
      { field: "name", values: ["myVMName"] },
      { field: "location", values: ["eastus", "westus", "westus2", "westeurope"] },
      { field: "tags" },
    ],
    resourceDetails: {
      apiVersion: "2019-12-01",
      resourceContent: {
        type: "Microsoft.Compute/virtualMachines",
        properties: { priority: "Spot" },
      },
    },
  });
  console.log(result);
}

async function main() {
  await checkPolicyRestrictionsAtResourceGroupScope();
  await checkPolicyRestrictionsAtResourceGroupScopeIncludingAuditEffect();
}

main().catch(console.error);
