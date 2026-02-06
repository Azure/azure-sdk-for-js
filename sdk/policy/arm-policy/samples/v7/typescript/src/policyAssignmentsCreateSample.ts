// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation creates or updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 *
 * @summary this operation creates or updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 * x-ms-original-file: 2025-03-01/createPolicyAssignment.json
 */
async function createOrUpdateAPolicyAssignment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyAssignments.create(
    "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2",
    "EnforceNaming",
    {
      description: "Force resource names to begin with given DeptA and end with -LC",
      displayName: "Enforce resource naming rules",
      metadata: { assignedBy: "Special Someone" },
      nonComplianceMessages: [
        { message: "Resource names must start with 'DeptA' and end with '-LC'." },
      ],
      parameters: { prefix: { value: "DeptA" }, suffix: { value: "-LC" } },
      policyDefinitionId:
        "/subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/providers/Microsoft.Authorization/policyDefinitions/ResourceNaming",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to this operation creates or updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 *
 * @summary this operation creates or updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 * x-ms-original-file: 2025-03-01/createPolicyAssignmentNonComplianceMessages.json
 */
async function createOrUpdateAPolicyAssignmentWithMultipleNonComplianceMessages(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyAssignments.create(
    "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2",
    "securityInitAssignment",
    {
      displayName: "Enforce security policies",
      nonComplianceMessages: [
        {
          message:
            "Resources must comply with all internal security policies. See <internal site URL> for more info.",
        },
        {
          message: "Resource names must start with 'DeptA' and end with '-LC'.",
          policyDefinitionReferenceId: "10420126870854049575",
        },
        {
          message: "Storage accounts must have firewall rules configured.",
          policyDefinitionReferenceId: "8572513655450389710",
        },
      ],
      policyDefinitionId:
        "/subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/providers/Microsoft.Authorization/policySetDefinitions/securityInitiative",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to this operation creates or updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 *
 * @summary this operation creates or updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 * x-ms-original-file: 2025-03-01/createPolicyAssignmentWithEnrollEnforcement.json
 */
async function createOrUpdateAPolicyAssignmentToEnforcePolicyEffectOnlyOnEnrolledResourcesDuringResourceCreationOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyAssignments.create(
    "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2",
    "EnforceNamingEnroll",
    {
      description: "Force resource names to begin with given DeptA and end with -LC",
      displayName: "Enforce resource naming rules",
      enforcementMode: "Enroll",
      metadata: { assignedBy: "Special Someone" },
      parameters: { prefix: { value: "DeptA" }, suffix: { value: "-LC" } },
      policyDefinitionId:
        "/subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/providers/Microsoft.Authorization/policyDefinitions/ResourceNaming",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to this operation creates or updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 *
 * @summary this operation creates or updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 * x-ms-original-file: 2025-03-01/createPolicyAssignmentWithIdentity.json
 */
async function createOrUpdateAPolicyAssignmentWithASystemAssignedIdentity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyAssignments.create(
    "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2",
    "EnforceNaming",
    {
      identity: { type: "SystemAssigned" },
      location: "eastus",
      description: "Force resource names to begin with given DeptA and end with -LC",
      displayName: "Enforce resource naming rules",
      enforcementMode: "Default",
      metadata: { assignedBy: "Foo Bar" },
      parameters: { prefix: { value: "DeptA" }, suffix: { value: "-LC" } },
      policyDefinitionId:
        "/subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/providers/Microsoft.Authorization/policyDefinitions/ResourceNaming",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to this operation creates or updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 *
 * @summary this operation creates or updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 * x-ms-original-file: 2025-03-01/createPolicyAssignmentWithOverrides.json
 */
async function createOrUpdateAPolicyAssignmentWithOverrides(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyAssignments.create(
    "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2",
    "CostManagement",
    {
      description: "Limit the resource location and resource SKU",
      definitionVersion: "1.*.*",
      displayName: "Limit the resource location and resource SKU",
      metadata: { assignedBy: "Special Someone" },
      overrides: [
        {
          kind: "policyEffect",
          selectors: [
            { in: ["Limit_Skus", "Limit_Locations"], kind: "policyDefinitionReferenceId" },
          ],
          value: "Audit",
        },
        {
          kind: "definitionVersion",
          selectors: [{ in: ["eastUSEuap", "centralUSEuap"], kind: "resourceLocation" }],
          value: "2.*.*",
        },
      ],
      policyDefinitionId:
        "/subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/providers/Microsoft.Authorization/policySetDefinitions/CostManagement",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to this operation creates or updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 *
 * @summary this operation creates or updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 * x-ms-original-file: 2025-03-01/createPolicyAssignmentWithResourceSelectors.json
 */
async function createOrUpdateAPolicyAssignmentWithResourceSelectors(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyAssignments.create(
    "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2",
    "CostManagement",
    {
      description: "Limit the resource location and resource SKU",
      displayName: "Limit the resource location and resource SKU",
      metadata: { assignedBy: "Special Someone" },
      policyDefinitionId:
        "/subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/providers/Microsoft.Authorization/policySetDefinitions/CostManagement",
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
 * This sample demonstrates how to this operation creates or updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 *
 * @summary this operation creates or updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 * x-ms-original-file: 2025-03-01/createPolicyAssignmentWithUserAssignedIdentity.json
 */
async function createOrUpdateAPolicyAssignmentWithAUserAssignedIdentity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyAssignments.create(
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
      description: "Force resource names to begin with given DeptA and end with -LC",
      displayName: "Enforce resource naming rules",
      enforcementMode: "Default",
      metadata: { assignedBy: "Foo Bar" },
      parameters: { prefix: { value: "DeptA" }, suffix: { value: "-LC" } },
      policyDefinitionId:
        "/subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/providers/Microsoft.Authorization/policyDefinitions/ResourceNaming",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to this operation creates or updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 *
 * @summary this operation creates or updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 * x-ms-original-file: 2025-03-01/createPolicyAssignmentWithoutEnforcement.json
 */
async function createOrUpdateAPolicyAssignmentWithoutEnforcingPolicyEffectDuringResourceCreationOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyAssignments.create(
    "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2",
    "EnforceNaming",
    {
      description: "Force resource names to begin with given DeptA and end with -LC",
      displayName: "Enforce resource naming rules",
      enforcementMode: "DoNotEnforce",
      metadata: { assignedBy: "Special Someone" },
      parameters: { prefix: { value: "DeptA" }, suffix: { value: "-LC" } },
      policyDefinitionId:
        "/subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/providers/Microsoft.Authorization/policyDefinitions/ResourceNaming",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAPolicyAssignment();
  await createOrUpdateAPolicyAssignmentWithMultipleNonComplianceMessages();
  await createOrUpdateAPolicyAssignmentToEnforcePolicyEffectOnlyOnEnrolledResourcesDuringResourceCreationOrUpdate();
  await createOrUpdateAPolicyAssignmentWithASystemAssignedIdentity();
  await createOrUpdateAPolicyAssignmentWithOverrides();
  await createOrUpdateAPolicyAssignmentWithResourceSelectors();
  await createOrUpdateAPolicyAssignmentWithAUserAssignedIdentity();
  await createOrUpdateAPolicyAssignmentWithoutEnforcingPolicyEffectDuringResourceCreationOrUpdate();
}

main().catch(console.error);
