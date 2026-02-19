// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeploymentStacksClient } from "@azure/arm-resourcesdeploymentstacks";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists Deployment stacks at the specified scope.
 *
 * @summary lists Deployment stacks at the specified scope.
 * x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsManagementGroupList.json
 */
async function listTheAvailableDeploymentStackWhatIfResultsAtManagementGroupScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new DeploymentStacksClient(credential);
  const resArray = new Array();
  for await (const item of client.deploymentStacksWhatIfResultsAtManagementGroup.list("myMg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listTheAvailableDeploymentStackWhatIfResultsAtManagementGroupScope();
}

main().catch(console.error);
