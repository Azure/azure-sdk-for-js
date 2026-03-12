// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to  This operation updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 *
 * @summary  This operation updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2024-05-01/examples/updatePolicyAssignmentWithIdentity.json
 */

import type { PolicyAssignmentUpdate } from "@azure/arm-policy";
import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateAPolicyAssignmentWithASystemAssignedIdentity(): Promise<void> {
  const scope = "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2";
  const policyAssignmentName = "EnforceNaming";
  const parameters: PolicyAssignmentUpdate = {
    identity: { type: "SystemAssigned" },
    location: "eastus",
  };
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyAssignments.update(
    scope,
    policyAssignmentName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to  This operation updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 *
 * @summary  This operation updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2024-05-01/examples/updatePolicyAssignmentWithUserAssignedIdentity.json
 */
async function updateAPolicyAssignmentWithAUserAssignedIdentity(): Promise<void> {
  const scope = "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2";
  const policyAssignmentName = "EnforceNaming";
  const parameters: PolicyAssignmentUpdate = {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/ae640e6bBa3e42569d622993eecfa6f2/resourceGroups/testResourceGroup/providers/MicrosoftManagedIdentity/userAssignedIdentities/testIdentity":
          {},
      },
    },
    location: "eastus",
  };
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyAssignments.update(
    scope,
    policyAssignmentName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to  This operation updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 *
 * @summary  This operation updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2024-05-01/examples/updatePolicyAssignmentWithOverrides.json
 */
async function updateAPolicyAssignmentWithOverrides(): Promise<void> {
  const scope = "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2";
  const policyAssignmentName = "CostManagement";
  const parameters: PolicyAssignmentUpdate = {
    overrides: [
      {
        kind: "policyEffect",
        selectors: [
          {
            in: ["Limit_Skus", "Limit_Locations"],
            kind: "policyDefinitionReferenceId",
          },
        ],
        value: "Audit",
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyAssignments.update(
    scope,
    policyAssignmentName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to  This operation updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 *
 * @summary  This operation updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2024-05-01/examples/updatePolicyAssignmentWithResourceSelectors.json
 */
async function updateAPolicyAssignmentWithResourceSelectors(): Promise<void> {
  const scope = "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2";
  const policyAssignmentName = "CostManagement";
  const parameters: PolicyAssignmentUpdate = {
    resourceSelectors: [
      {
        name: "SDPRegions",
        selectors: [
          { in: ["eastus2euap", "centraluseuap"], kind: "resourceLocation" },
        ],
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyAssignments.update(
    scope,
    policyAssignmentName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAPolicyAssignmentWithASystemAssignedIdentity();
  await updateAPolicyAssignmentWithAUserAssignedIdentity();
  await updateAPolicyAssignmentWithOverrides();
  await updateAPolicyAssignmentWithResourceSelectors();
}

main().catch(console.error);
