// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeploymentsClient } from "@azure/arm-resourcesdeployments";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to you can provide the template and parameters directly in the request or link to JSON files.
 *
 * @summary you can provide the template and parameters directly in the request or link to JSON files.
 * x-ms-original-file: 2025-04-01/PutDeploymentSubscriptionTemplateSpecsWithId.json
 */
async function createADeploymentThatWillDeployATemplateSpecWithTheGivenResourceId(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000001";
  const client = new DeploymentsClient(credential, subscriptionId);
  const result = await client.deployments.createOrUpdateAtSubscriptionScope("my-deployment", {
    location: "eastus",
    properties: {
      mode: "Incremental",
      parameters: {},
      templateLink: {
        id: "/subscriptions/00000000-0000-0000-0000-000000000001/resourceGroups/my-resource-group/providers/Microsoft.Resources/TemplateSpecs/TemplateSpec-Name/versions/v1",
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createADeploymentThatWillDeployATemplateSpecWithTheGivenResourceId();
}

main().catch(console.error);
