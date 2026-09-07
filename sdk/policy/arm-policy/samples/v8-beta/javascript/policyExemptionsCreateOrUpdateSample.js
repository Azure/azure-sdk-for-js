// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation creates or updates a policy exemption with the given scope and name. Policy exemptions apply to all resources contained within their scope. For example, when you create a policy exemption at resource group scope for a policy assignment at the same or above level, the exemption exempts to all applicable resources in the resource group.
 *
 * @summary this operation creates or updates a policy exemption with the given scope and name. Policy exemptions apply to all resources contained within their scope. For example, when you create a policy exemption at resource group scope for a policy assignment at the same or above level, the exemption exempts to all applicable resources in the resource group.
 * x-ms-original-file: 2026-01-01-preview/createOrUpdatePolicyExemption.json
 */
async function createOrUpdateAPolicyExemption() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyExemptions.createOrUpdate(
    "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/resourceGroups/demoCluster",
    "DemoExpensiveVM",
    {
      policyAssignmentId:
        "/subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/providers/Microsoft.Authorization/policyAssignments/CostManagement",
      policyDefinitionReferenceIds: ["Limit_Skus"],
      exemptionCategory: "Waiver",
      displayName: "Exempt demo cluster",
      description: "Exempt demo cluster from limit sku",
      metadata: { reason: "Temporary exemption for a expensive VM demo" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to this operation creates or updates a policy exemption with the given scope and name. Policy exemptions apply to all resources contained within their scope. For example, when you create a policy exemption at resource group scope for a policy assignment at the same or above level, the exemption exempts to all applicable resources in the resource group.
 *
 * @summary this operation creates or updates a policy exemption with the given scope and name. Policy exemptions apply to all resources contained within their scope. For example, when you create a policy exemption at resource group scope for a policy assignment at the same or above level, the exemption exempts to all applicable resources in the resource group.
 * x-ms-original-file: 2026-01-01-preview/createOrUpdatePolicyExemptionWithExemptionManagementMode.json
 */
async function createOrUpdateAPolicyExemptionWithExemptionManagementMode() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyExemptions.createOrUpdate(
    "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/resourceGroups/demoCluster",
    "DemoExpensiveVM",
    {
      policyAssignmentId:
        "/subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/providers/Microsoft.Authorization/policyAssignments/CostManagement",
      policyDefinitionReferenceIds: ["Limit_Skus"],
      exemptionCategory: "Waiver",
      displayName: "Exempt demo cluster",
      description: "Exempt demo cluster from limit sku",
      metadata: { reason: "Temporary exemption for a expensive VM demo" },
      exemptionManagementMode: "UserSelfServe",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to this operation creates or updates a policy exemption with the given scope and name. Policy exemptions apply to all resources contained within their scope. For example, when you create a policy exemption at resource group scope for a policy assignment at the same or above level, the exemption exempts to all applicable resources in the resource group.
 *
 * @summary this operation creates or updates a policy exemption with the given scope and name. Policy exemptions apply to all resources contained within their scope. For example, when you create a policy exemption at resource group scope for a policy assignment at the same or above level, the exemption exempts to all applicable resources in the resource group.
 * x-ms-original-file: 2026-01-01-preview/createOrUpdatePolicyExemptionWithResourceSelectors.json
 */
async function createOrUpdateAPolicyExemptionWithResourceSelectors() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyExemptions.createOrUpdate(
    "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/resourceGroups/demoCluster",
    "DemoExpensiveVM",
    {
      policyAssignmentId:
        "/subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/providers/Microsoft.Authorization/policyAssignments/CostManagement",
      policyDefinitionReferenceIds: ["Limit_Skus"],
      exemptionCategory: "Waiver",
      displayName: "Exempt demo cluster",
      description: "Exempt demo cluster from limit sku",
      metadata: { reason: "Temporary exemption for a expensive VM demo" },
      assignmentScopeValidation: "Default",
      resourceSelectors: [
        {
          name: "SDPRegions",
          selectors: [{ kind: "resourceLocation", in: ["eastus2euap", "centraluseuap"] }],
        },
      ],
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateAPolicyExemption();
  await createOrUpdateAPolicyExemptionWithExemptionManagementMode();
  await createOrUpdateAPolicyExemptionWithResourceSelectors();
}

main().catch(console.error);
