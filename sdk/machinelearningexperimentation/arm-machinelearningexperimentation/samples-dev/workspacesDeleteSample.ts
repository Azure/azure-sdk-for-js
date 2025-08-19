// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MLTeamAccountManagementClient } from "@azure/arm-machinelearningexperimentation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes a machine learning workspace.
 *
 * @summary Deletes a machine learning workspace.
 * x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/WorkspaceDelete.json
 */
async function workspaceDelete(): Promise<void> {
  const subscriptionId =
    process.env["MACHINELEARNINGEXPERIMENTATION_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["MACHINELEARNINGEXPERIMENTATION_RESOURCE_GROUP"] || "myResourceGroup";
  const accountName = "myAccount";
  const workspaceName = "testworkspace";
  const credential = new DefaultAzureCredential();
  const client = new MLTeamAccountManagementClient(credential, subscriptionId);
  const result = await client.workspaces.delete(resourceGroupName, accountName, workspaceName);
  console.log(result);
}

async function main(): Promise<void> {
  await workspaceDelete();
}

main().catch(console.error);
