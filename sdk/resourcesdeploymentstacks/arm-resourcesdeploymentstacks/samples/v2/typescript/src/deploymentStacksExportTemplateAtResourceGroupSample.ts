// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeploymentStacksClient } from "@azure/arm-resourcesdeploymentstacks";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to exports the template used to create the Deployment stack at the specified scope.
 *
 * @summary exports the template used to create the Deployment stack at the specified scope.
 * x-ms-original-file: 2025-07-01/DeploymentStackExportTemplate.json
 */
async function exportTheDeploymentTemplateForAResourceGroupDeploymentStack(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeploymentStacksClient(credential, subscriptionId);
  const result = await client.deploymentStacks.exportTemplateAtResourceGroup(
    "deploymentStacksRG",
    "simpleDeploymentStack",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await exportTheDeploymentTemplateForAResourceGroupDeploymentStack();
}

main().catch(console.error);
