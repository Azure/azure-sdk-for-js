// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation creates or updates a policy set definition in the given management group with the given name.
 *
 * @summary this operation creates or updates a policy set definition in the given management group with the given name.
 * x-ms-original-file: 2025-03-01/createOrUpdatePolicySetDefinitionAtManagementGroup.json
 */
async function createOrUpdateAPolicySetDefinitionAtManagementGroupLevel() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policySetDefinitions.createOrUpdateAtManagementGroup(
    "MyManagementGroup",
    "CostManagement",
    {
      description: "Policies to enforce low cost storage SKUs",
      displayName: "Cost Management",
      metadata: { category: "Cost Management" },
      policyDefinitions: [
        {
          parameters: { listOfAllowedSKUs: { value: ["Standard_GRS", "Standard_LRS"] } },
          policyDefinitionId:
            "/providers/Microsoft.Management/managementgroups/MyManagementGroup/providers/Microsoft.Authorization/policyDefinitions/7433c107-6db4-4ad1-b57a-a76dce0154a1",
          policyDefinitionReferenceId: "Limit_Skus",
        },
        {
          parameters: { prefix: { value: "DeptA" }, suffix: { value: "-LC" } },
          policyDefinitionId:
            "/providers/Microsoft.Management/managementgroups/MyManagementGroup/providers/Microsoft.Authorization/policyDefinitions/ResourceNaming",
          policyDefinitionReferenceId: "Resource_Naming",
        },
      ],
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to this operation creates or updates a policy set definition in the given management group with the given name.
 *
 * @summary this operation creates or updates a policy set definition in the given management group with the given name.
 * x-ms-original-file: 2025-03-01/createOrUpdatePolicySetDefinitionWithGroupsAtManagementGroup.json
 */
async function createOrUpdateAPolicySetDefinitionWithGroupsAtManagementGroupLevel() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policySetDefinitions.createOrUpdateAtManagementGroup(
    "MyManagementGroup",
    "CostManagement",
    {
      description: "Policies to enforce low cost storage SKUs",
      displayName: "Cost Management",
      metadata: { category: "Cost Management" },
      policyDefinitionGroups: [
        {
          name: "CostSaving",
          description: "Policies designed to control spend within a subscription.",
          displayName: "Cost Management Policies",
        },
        {
          name: "Organizational",
          description:
            "Policies that help enforce resource organization standards within a subscription.",
          displayName: "Organizational Policies",
        },
      ],
      policyDefinitions: [
        {
          groupNames: ["CostSaving"],
          parameters: { listOfAllowedSKUs: { value: ["Standard_GRS", "Standard_LRS"] } },
          policyDefinitionId:
            "/subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/providers/Microsoft.Authorization/policyDefinitions/7433c107-6db4-4ad1-b57a-a76dce0154a1",
          policyDefinitionReferenceId: "Limit_Skus",
        },
        {
          groupNames: ["Organizational"],
          parameters: { prefix: { value: "DeptA" }, suffix: { value: "-LC" } },
          policyDefinitionId:
            "/subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/providers/Microsoft.Authorization/policyDefinitions/ResourceNaming",
          policyDefinitionReferenceId: "Resource_Naming",
        },
      ],
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateAPolicySetDefinitionAtManagementGroupLevel();
  await createOrUpdateAPolicySetDefinitionWithGroupsAtManagementGroupLevel();
}

main().catch(console.error);
