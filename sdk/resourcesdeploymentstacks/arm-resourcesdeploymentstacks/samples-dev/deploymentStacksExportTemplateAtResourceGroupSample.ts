// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Exports the template used to create the Deployment stack at Resource Group scope.
 *
 * @summary Exports the template used to create the Deployment stack at Resource Group scope.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackExportTemplate.json
 */

import { DeploymentStacksClient } from "@azure/arm-resourcesdeploymentstacks";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deploymentStacksResourceGroupExportTemplate(): Promise<void> {
  const subscriptionId =
    process.env["RESOURCESDEPLOYMENTSTACKS_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["RESOURCESDEPLOYMENTSTACKS_RESOURCE_GROUP"] || "deploymentStacksRG";
  const deploymentStackName = "simpleDeploymentStack";
  const credential = new DefaultAzureCredential();
  const client = new DeploymentStacksClient(credential, subscriptionId);
  const result = await client.deploymentStacks.exportTemplateAtResourceGroup(
    resourceGroupName,
    deploymentStackName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deploymentStacksResourceGroupExportTemplate();
}

main().catch(console.error);
