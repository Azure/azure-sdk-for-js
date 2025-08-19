// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a project with the specified parameters.
 *
 * @summary Creates or updates a project with the specified parameters.
 * x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/CreateProject.json
 */

import type { Project } from "@azure/arm-machinelearningexperimentation";
import { MLTeamAccountManagementClient } from "@azure/arm-machinelearningexperimentation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createProject(): Promise<void> {
  const subscriptionId =
    process.env["MACHINELEARNINGEXPERIMENTATION_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["MACHINELEARNINGEXPERIMENTATION_RESOURCE_GROUP"] || "myResourceGroup";
  const accountName = "testaccount";
  const workspaceName = "testworkspace";
  const projectName = "testProject";
  const parameters: Project = {
    friendlyName: "testName",
    gitrepo: "https://github/abc",
    location: "East US",
    tags: { tagKey1: "TagValue1" },
  };
  const credential = new DefaultAzureCredential();
  const client = new MLTeamAccountManagementClient(credential, subscriptionId);
  const result = await client.projects.createOrUpdate(
    resourceGroupName,
    accountName,
    workspaceName,
    projectName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createProject();
}

main().catch(console.error);
