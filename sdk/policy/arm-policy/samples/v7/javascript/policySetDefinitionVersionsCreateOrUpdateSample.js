// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation creates or updates a policy set definition version in the given subscription with the given name and version.
 *
 * @summary this operation creates or updates a policy set definition version in the given subscription with the given name and version.
 * x-ms-original-file: 2025-03-01/createOrUpdatePolicySetDefinitionVersion.json
 */
async function createOrUpdateAPolicySetDefinitionVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ae640e6b-ba3e-4256-9d62-2993eecfa6f2";
  const client = new PolicyClient(credential, subscriptionId);
  const result = await client.policySetDefinitionVersions.createOrUpdate(
    "CostManagement",
    "1.2.1",
    {
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
      version: "1.2.1",
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateAPolicySetDefinitionVersion();
}

main().catch(console.error);
