// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeploymentStacksClient } = require("@azure/arm-resourcesdeploymentstacks");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a Deployment stack at the specified scope.
 *
 * @summary creates or updates a Deployment stack at the specified scope.
 * x-ms-original-file: 2025-07-01/DeploymentStackManagementGroupCreate.json
 */
async function createOrUpdateAManagementGroupDeploymentStack() {
  const credential = new DefaultAzureCredential();
  const client = new DeploymentStacksClient(credential);
  const result = await client.deploymentStacks.createOrUpdateAtManagementGroup(
    "myMg",
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
  await createOrUpdateAManagementGroupDeploymentStack();
}

main().catch(console.error);
