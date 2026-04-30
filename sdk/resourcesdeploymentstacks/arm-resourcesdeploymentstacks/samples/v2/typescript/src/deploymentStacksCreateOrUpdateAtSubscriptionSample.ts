// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeploymentStacksClient } from "@azure/arm-resourcesdeploymentstacks";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a Deployment stack at the specified scope.
 *
 * @summary creates or updates a Deployment stack at the specified scope.
 * x-ms-original-file: 2025-07-01/DeploymentStackSubscriptionCreate.json
 */
async function createOrUpdateASubscriptionDeploymentStack(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeploymentStacksClient(credential, subscriptionId);
  const result = await client.deploymentStacks.createOrUpdateAtSubscription(
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

async function main(): Promise<void> {
  await createOrUpdateASubscriptionDeploymentStack();
}

main().catch(console.error);
