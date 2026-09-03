// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeploymentStacksClient } from "@azure/arm-resourcesdeploymentstacks";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content.
 *
 * @summary deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content.
 * x-ms-original-file: 2025-07-01/DeploymentStackManagementGroupDelete.json
 */
async function deleteAManagementGroupDeploymentStack(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new DeploymentStacksClient(credential);
  await client.deploymentStacks.deleteAtManagementGroup("myMg", "simpleDeploymentStack");
}

async function main(): Promise<void> {
  await deleteAManagementGroupDeploymentStack();
}

main().catch(console.error);
