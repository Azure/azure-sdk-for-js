// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeploymentStacksClient } from "@azure/arm-resourcesdeploymentstacks";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to exports the template used to create the Deployment stack at the specified scope.
 *
 * @summary exports the template used to create the Deployment stack at the specified scope.
 * x-ms-original-file: 2025-07-01/DeploymentStackManagementGroupExportTemplate.json
 */
async function exportTheDeploymentTemplateForAManagementGroupDeploymentStack(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new DeploymentStacksClient(credential);
  const result = await client.deploymentStacks.exportTemplateAtManagementGroup(
    "myMg",
    "simpleDeploymentStack",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await exportTheDeploymentTemplateForAManagementGroupDeploymentStack();
}

main().catch(console.error);
