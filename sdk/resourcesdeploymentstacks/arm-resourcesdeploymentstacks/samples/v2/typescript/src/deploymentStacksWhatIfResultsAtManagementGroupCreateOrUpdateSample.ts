// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeploymentStacksClient } from "@azure/arm-resourcesdeploymentstacks";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a Deployment stack at the specified scope.
 *
 * @summary creates or updates a Deployment stack at the specified scope.
 * x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsManagementGroupCreate.json
 */
async function createOrUpdateAManagementGroupDeploymentStackWhatIfResult(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new DeploymentStacksClient(credential);
  const result = await client.deploymentStacksWhatIfResultsAtManagementGroup.createOrUpdate(
    "myMg",
    "simpleDeploymentStackWhatIfResult",
    {
      location: "eastus",
      properties: {
        deploymentStackResourceId:
          "/providers/Microsoft.Management/managementGroups/myMg/providers/Microsoft.Resources/deploymentStacks/simpleDeploymentStack",
        retentionInterval: "P7D",
        templateLink: { uri: "https://example.com/exampleTemplate.json" },
        parameters: {},
        actionOnUnmanage: {
          resources: "delete",
          resourceGroups: "delete",
          managementGroups: "detach",
        },
        denySettings: { mode: "none", applyToChildScopes: false },
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

async function main(): Promise<void> {
  await createOrUpdateAManagementGroupDeploymentStackWhatIfResult();
}

main().catch(console.error);
