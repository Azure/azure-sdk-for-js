// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to You can provide the template and parameters directly in the request or link to JSON files.
 *
 * @summary You can provide the template and parameters directly in the request or link to JSON files.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/deployments/stable/2025-04-01/examples/PutDeploymentSubscriptionTemplateSpecsWithId.json
 */

import { Deployment, DeploymentsClient } from "@azure/arm-resourcesdeployments";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createADeploymentThatWillDeployATemplateSpecWithTheGivenResourceId(): Promise<void> {
  const subscriptionId =
    process.env["RESOURCES_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000001";
  const deploymentName = "my-deployment";
  const parameters: Deployment = {
    location: "eastus",
    properties: {
      mode: "Incremental",
      parameters: {},
      templateLink: {
        id: "/subscriptions/00000000-0000-0000-0000-000000000001/resourceGroups/my-resource-group/providers/Microsoft.Resources/TemplateSpecs/TemplateSpec-Name/versions/v1",
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new DeploymentsClient(credential, subscriptionId);
  const result =
    await client.deployments.beginCreateOrUpdateAtSubscriptionScopeAndWait(
      deploymentName,
      parameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await createADeploymentThatWillDeployATemplateSpecWithTheGivenResourceId();
}

main().catch(console.error);
