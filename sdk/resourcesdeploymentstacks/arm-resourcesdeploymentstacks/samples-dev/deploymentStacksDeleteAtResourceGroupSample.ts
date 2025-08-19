// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes a Deployment stack by name at Resource Group scope. When operation completes, status code 200 returned without content.
 *
 * @summary Deletes a Deployment stack by name at Resource Group scope. When operation completes, status code 200 returned without content.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackResourceGroupDelete.json
 */

import { DeploymentStacksClient } from "@azure/arm-resourcesdeploymentstacks";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deploymentStacksResourceGroupDelete(): Promise<void> {
  const subscriptionId =
    process.env["RESOURCESDEPLOYMENTSTACKS_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["RESOURCESDEPLOYMENTSTACKS_RESOURCE_GROUP"] || "deploymentStacksRG";
  const deploymentStackName = "simpleDeploymentStack";
  const credential = new DefaultAzureCredential();
  const client = new DeploymentStacksClient(credential, subscriptionId);
  const result = await client.deploymentStacks.beginDeleteAtResourceGroupAndWait(
    resourceGroupName,
    deploymentStackName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deploymentStacksResourceGroupDelete();
}

main().catch(console.error);
