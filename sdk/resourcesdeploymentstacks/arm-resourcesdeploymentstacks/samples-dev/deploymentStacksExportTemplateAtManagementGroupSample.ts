// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Exports the template used to create the Deployment stack at Management Group scope.
 *
 * @summary Exports the template used to create the Deployment stack at Management Group scope.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackManagementGroupExportTemplate.json
 */

import { DeploymentStacksClient } from "@azure/arm-resourcesdeploymentstacks";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deploymentStacksManagementGroupExportTemplate(): Promise<void> {
  const managementGroupId = "myMg";
  const deploymentStackName = "simpleDeploymentStack";
  const credential = new DefaultAzureCredential();
  const client = new DeploymentStacksClient(credential);
  const result = await client.deploymentStacks.exportTemplateAtManagementGroup(
    managementGroupId,
    deploymentStackName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deploymentStacksManagementGroupExportTemplate();
}

main().catch(console.error);
