// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 *
 * @summary this operation updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 * x-ms-original-file: 2025-03-01/updatePolicyAssignmentWithIdentity.json
 */
async function updateAPolicyAssignmentWithASystemAssignedIdentity() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyAssignments.update(
    "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2",
    "EnforceNaming",
    { identity: { type: "SystemAssigned" }, location: "eastus" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to this operation updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 *
 * @summary this operation updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 * x-ms-original-file: 2025-03-01/updatePolicyAssignmentWithOverrides.json
 */
async function updateAPolicyAssignmentWithOverrides() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyAssignments.update(
    "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2",
    "CostManagement",
    {
      overrides: [
        {
          kind: "policyEffect",
          selectors: [
            { in: ["Limit_Skus", "Limit_Locations"], kind: "policyDefinitionReferenceId" },
          ],
          value: "Audit",
        },
      ],
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to this operation updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 *
 * @summary this operation updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 * x-ms-original-file: 2025-03-01/updatePolicyAssignmentWithResourceSelectors.json
 */
async function updateAPolicyAssignmentWithResourceSelectors() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyAssignments.update(
    "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2",
    "CostManagement",
    {
      resourceSelectors: [
        {
          name: "SDPRegions",
          selectors: [{ in: ["eastus2euap", "centraluseuap"], kind: "resourceLocation" }],
        },
      ],
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to this operation updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 *
 * @summary this operation updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 * x-ms-original-file: 2025-03-01/updatePolicyAssignmentWithUserAssignedIdentity.json
 */
async function updateAPolicyAssignmentWithAUserAssignedIdentity() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyAssignments.update(
    "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2",
    "EnforceNaming",
    {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/resourceGroups/testResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/test-identity":
            {},
        },
      },
      location: "eastus",
    },
  );
  console.log(result);
}

async function main() {
  await updateAPolicyAssignmentWithASystemAssignedIdentity();
  await updateAPolicyAssignmentWithOverrides();
  await updateAPolicyAssignmentWithResourceSelectors();
  await updateAPolicyAssignmentWithAUserAssignedIdentity();
}

main().catch(console.error);
