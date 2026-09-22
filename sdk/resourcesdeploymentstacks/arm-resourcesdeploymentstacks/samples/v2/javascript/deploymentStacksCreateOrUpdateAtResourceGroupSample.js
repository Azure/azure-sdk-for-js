// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeploymentStacksClient } = require("@azure/arm-resourcesdeploymentstacks");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a Deployment stack at the specified scope.
 *
 * @summary creates or updates a Deployment stack at the specified scope.
 * x-ms-original-file: 2025-07-01/DeploymentStackResourceGroupCreate.json
 */
async function createOrUpdateAResourceGroupDeploymentStack() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeploymentStacksClient(credential, subscriptionId);
  const result = await client.deploymentStacks.createOrUpdateAtResourceGroup(
    "deploymentStacksRG",
    "simpleDeploymentStack",
    {
      location: "eastus",
      tags: { tagkey: "tagVal" },
      properties: {
        actionOnUnmanage: {
          resources: "delete",
          resourceGroups: "delete",
          managementGroups: "detach",
        },
        denySettings: {
          mode: "denyDelete",
          excludedPrincipals: ["principal"],
          excludedActions: ["action"],
          applyToChildScopes: false,
        },
        parameters: { parameter1: { value: "a string" } },
        extensionConfigs: {
          contoso: {
            additionalProperties: {
              configOne: { value: "config1Value" },
              configTwo: { value: true },
            },
          },
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateAResourceGroupDeploymentStack();
}

main().catch(console.error);
