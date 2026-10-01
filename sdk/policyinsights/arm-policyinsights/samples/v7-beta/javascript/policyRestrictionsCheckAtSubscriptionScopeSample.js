// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to checks what restrictions Azure Policy will place on a resource within a subscription.
 *
 * @summary checks what restrictions Azure Policy will place on a resource within a subscription.
 * x-ms-original-file: 2024-10-01/PolicyRestrictions_CheckAtSubscriptionScope.json
 */
async function checkPolicyRestrictionsAtSubscriptionScope() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "35ee058e-5fa0-414c-8145-3ebb8d09b6e2";
  const client = new PolicyInsightsClient(credential, subscriptionId);
  const result = await client.policyRestrictions.checkAtSubscriptionScope({
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
 * This sample demonstrates how to checks what restrictions Azure Policy will place on a resource within a subscription.
 *
 * @summary checks what restrictions Azure Policy will place on a resource within a subscription.
 * x-ms-original-file: 2024-10-01/PolicyRestrictions_CheckAtSubscriptionScopeIncludeAuditEffect.json
 */
async function checkPolicyRestrictionsAtSubscriptionScopeIncludingAuditEffect() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "35ee058e-5fa0-414c-8145-3ebb8d09b6e2";
  const client = new PolicyInsightsClient(credential, subscriptionId);
  const result = await client.policyRestrictions.checkAtSubscriptionScope({
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
  await checkPolicyRestrictionsAtSubscriptionScope();
  await checkPolicyRestrictionsAtSubscriptionScopeIncludingAuditEffect();
}

main().catch(console.error);
