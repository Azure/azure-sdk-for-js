// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MLTeamAccountManagementClient } from "@azure/arm-machinelearningexperimentation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes a project.
 *
 * @summary Deletes a project.
 * x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/DeleteProject.json
 */
async function projectDelete(): Promise<void> {
  const subscriptionId =
    process.env["MACHINELEARNINGEXPERIMENTATION_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["MACHINELEARNINGEXPERIMENTATION_RESOURCE_GROUP"] || "myResourceGroup";
  const accountName = "myAccount";
  const workspaceName = "testworkspace";
  const projectName = "testProject";
  const credential = new DefaultAzureCredential();
  const client = new MLTeamAccountManagementClient(credential, subscriptionId);
  const result = await client.projects.delete(
    resourceGroupName,
    accountName,
    workspaceName,
    projectName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await projectDelete();
}

main().catch(console.error);
