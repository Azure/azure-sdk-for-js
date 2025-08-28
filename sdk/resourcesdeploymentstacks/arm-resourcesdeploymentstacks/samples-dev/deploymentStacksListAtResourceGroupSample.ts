// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all the Deployment stacks within the specified Resource Group.
 *
 * @summary Lists all the Deployment stacks within the specified Resource Group.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackResourceGroupList.json
 */

import { DeploymentStacksClient } from "@azure/arm-resourcesdeploymentstacks";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deploymentStacksResourceGroupList(): Promise<void> {
  const subscriptionId =
    process.env["RESOURCESDEPLOYMENTSTACKS_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["RESOURCESDEPLOYMENTSTACKS_RESOURCE_GROUP"] || "deploymentStacksRG";
  const credential = new DefaultAzureCredential();
  const client = new DeploymentStacksClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.deploymentStacks.listAtResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await deploymentStacksResourceGroupList();
}

main().catch(console.error);
