// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeploymentStacksClient } = require("@azure/arm-resourcesdeploymentstacks");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to runs preflight validation on the Deployment stack template at the specified scope to verify its acceptance to Azure Resource Manager.
 *
 * @summary runs preflight validation on the Deployment stack template at the specified scope to verify its acceptance to Azure Resource Manager.
 * x-ms-original-file: 2025-07-01/DeploymentStackResourceGroupValidate.json
 */
async function validateAResourceGroupDeploymentStack() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeploymentStacksClient(credential, subscriptionId);
  const result = await client.deploymentStacks.validateStackAtResourceGroup(
    "deploymentStacksRG",
    "simpleDeploymentStack",
    {
      tags: { tagkey: "tagVal" },
      properties: {
        actionOnUnmanage: {
          resources: "delete",
          resourceGroups: "delete",
          managementGroups: "delete",
        },
        denySettings: {
          mode: "denyDelete",
          excludedPrincipals: ["principal"],
          excludedActions: ["action"],
          applyToChildScopes: false,
        },
        templateLink: { uri: "https://example.com/exampleTemplate.json" },
        parameters: { parameter1: { value: "a string" } },
      },
    },
  );
  console.log(result);
}

async function main() {
  await validateAResourceGroupDeploymentStack();
}

main().catch(console.error);
