// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all the Deployment stacks within the specified Management Group.
 *
 * @summary Lists all the Deployment stacks within the specified Management Group.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackManagementGroupList.json
 */

import { DeploymentStacksClient } from "@azure/arm-resourcesdeploymentstacks";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deploymentStacksManagementGroupList(): Promise<void> {
  const managementGroupId = "myMg";
  const credential = new DefaultAzureCredential();
  const client = new DeploymentStacksClient(credential);
  const resArray = new Array();
  for await (const item of client.deploymentStacks.listAtManagementGroup(managementGroupId)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await deploymentStacksManagementGroupList();
}

main().catch(console.error);
