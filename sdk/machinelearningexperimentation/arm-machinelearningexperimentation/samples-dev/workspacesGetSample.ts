// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MLTeamAccountManagementClient } from "@azure/arm-machinelearningexperimentation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the properties of the specified machine learning workspace.
 *
 * @summary Gets the properties of the specified machine learning workspace.
 * x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/WorkspaceGet.json
 */
async function workspaceGet(): Promise<void> {
  const subscriptionId =
    process.env["MACHINELEARNINGEXPERIMENTATION_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["MACHINELEARNINGEXPERIMENTATION_RESOURCE_GROUP"] || "accountcrud-1234";
  const accountName = "accountcrud5678";
  const workspaceName = "testworkspace";
  const credential = new DefaultAzureCredential();
  const client = new MLTeamAccountManagementClient(credential, subscriptionId);
  const result = await client.workspaces.get(resourceGroupName, accountName, workspaceName);
  console.log(result);
}

async function main(): Promise<void> {
  await workspaceGet();
}

main().catch(console.error);
