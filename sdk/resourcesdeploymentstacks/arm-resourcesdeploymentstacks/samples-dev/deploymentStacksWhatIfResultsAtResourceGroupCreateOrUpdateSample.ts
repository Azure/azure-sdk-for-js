// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeploymentStacksClient } from "@azure/arm-resourcesdeploymentstacks";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a Deployment stack at the specified scope.
 *
 * @summary creates or updates a Deployment stack at the specified scope.
 * x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsResourceGroupCreate.json
 */
async function createOrUpdateAResourceGroupScopedDeploymentStackWhatIfResult(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeploymentStacksClient(credential, subscriptionId);
  const result = await client.deploymentStacksWhatIfResultsAtResourceGroup.createOrUpdate(
    "myResourceGroup",
    "simpleDeploymentStackWhatIfResult",
    {
      location: "eastus",
      properties: {
        deploymentStackResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.Resources/deploymentStacks/simpleDeploymentStack",
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
  await createOrUpdateAResourceGroupScopedDeploymentStackWhatIfResult();
}

main().catch(console.error);
