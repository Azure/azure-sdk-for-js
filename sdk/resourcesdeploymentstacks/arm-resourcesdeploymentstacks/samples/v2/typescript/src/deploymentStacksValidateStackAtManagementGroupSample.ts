// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeploymentStacksClient } from "@azure/arm-resourcesdeploymentstacks";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to runs preflight validation on the Deployment stack template at the specified scope to verify its acceptance to Azure Resource Manager.
 *
 * @summary runs preflight validation on the Deployment stack template at the specified scope to verify its acceptance to Azure Resource Manager.
 * x-ms-original-file: 2025-07-01/DeploymentStackManagementGroupValidate.json
 */
async function validateAManagementGroupDeploymentStack(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new DeploymentStacksClient(credential);
  const result = await client.deploymentStacks.validateStackAtManagementGroup(
    "myMg",
    "simpleDeploymentStack",
    {
      location: "eastus",
      tags: { tagkey: "tagVal" },
      properties: {
        actionOnUnmanage: {
          resources: "detach",
          resourceGroups: "detach",
          managementGroups: "detach",
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

async function main(): Promise<void> {
  await validateAManagementGroupDeploymentStack();
}

main().catch(console.error);
