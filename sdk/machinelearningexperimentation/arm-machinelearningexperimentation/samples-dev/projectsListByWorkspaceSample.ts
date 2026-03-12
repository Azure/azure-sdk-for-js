// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all the available machine learning projects under the specified workspace.
 *
 * @summary Lists all the available machine learning projects under the specified workspace.
 * x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/ProjectListByWorkspaces.json
 */

import { MLTeamAccountManagementClient } from "@azure/arm-machinelearningexperimentation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function projectListByWorkspaces(): Promise<void> {
  const subscriptionId =
    process.env["MACHINELEARNINGEXPERIMENTATION_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const accountName = "testaccount";
  const workspaceName = "testworkspace";
  const resourceGroupName =
    process.env["MACHINELEARNINGEXPERIMENTATION_RESOURCE_GROUP"] || "testrg";
  const credential = new DefaultAzureCredential();
  const client = new MLTeamAccountManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.projects.listByWorkspace(
    accountName,
    workspaceName,
    resourceGroupName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await projectListByWorkspaces();
}

main().catch(console.error);
