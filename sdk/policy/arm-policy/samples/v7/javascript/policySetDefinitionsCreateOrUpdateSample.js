// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation creates or updates a policy set definition in the given subscription with the given name.
 *
 * @summary this operation creates or updates a policy set definition in the given subscription with the given name.
 * x-ms-original-file: 2025-03-01/createOrUpdatePolicySetDefinition.json
 */
async function createOrUpdateAPolicySetDefinition() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ae640e6b-ba3e-4256-9d62-2993eecfa6f2";
  const client = new PolicyClient(credential, subscriptionId);
  const result = await client.policySetDefinitions.createOrUpdate("CostManagement", {
    description: "Policies to enforce low cost storage SKUs",
    displayName: "Cost Management",
    metadata: { category: "Cost Management" },
    parameters: {
      namePrefix: {
        type: "String",
        defaultValue: "myPrefix",
        metadata: { displayName: "Prefix to enforce on resource names" },
      },
    },
    policyDefinitions: [
      {
        parameters: { listOfAllowedSKUs: { value: ["Standard_GRS", "Standard_LRS"] } },
        policyDefinitionId:
          "/subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/providers/Microsoft.Authorization/policyDefinitions/7433c107-6db4-4ad1-b57a-a76dce0154a1",
        policyDefinitionReferenceId: "Limit_Skus",
      },
      {
        parameters: { prefix: { value: "[parameters('namePrefix')]" }, suffix: { value: "-LC" } },
        policyDefinitionId:
          "/subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/providers/Microsoft.Authorization/policyDefinitions/ResourceNaming",
        policyDefinitionReferenceId: "Resource_Naming",
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to this operation creates or updates a policy set definition in the given subscription with the given name.
 *
 * @summary this operation creates or updates a policy set definition in the given subscription with the given name.
 * x-ms-original-file: 2025-03-01/createOrUpdatePolicySetDefinitionWithGroups.json
 */
async function createOrUpdateAPolicySetDefinitionWithGroups() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ae640e6b-ba3e-4256-9d62-2993eecfa6f2";
  const client = new PolicyClient(credential, subscriptionId);
  const result = await client.policySetDefinitions.createOrUpdate("CostManagement", {
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
        definitionVersion: "1.*.*",
        groupNames: ["CostSaving"],
        parameters: { listOfAllowedSKUs: { value: ["Standard_GRS", "Standard_LRS"] } },
        policyDefinitionId:
          "/subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/providers/Microsoft.Authorization/policyDefinitions/7433c107-6db4-4ad1-b57a-a76dce0154a1",
        policyDefinitionReferenceId: "Limit_Skus",
      },
      {
        definitionVersion: "1.*.*",
        groupNames: ["Organizational"],
        parameters: { prefix: { value: "DeptA" }, suffix: { value: "-LC" } },
        policyDefinitionId:
          "/subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/providers/Microsoft.Authorization/policyDefinitions/ResourceNaming",
        policyDefinitionReferenceId: "Resource_Naming",
      },
    ],
  });
  console.log(result);
}

async function main() {
  await createOrUpdateAPolicySetDefinition();
  await createOrUpdateAPolicySetDefinitionWithGroups();
}

main().catch(console.error);
