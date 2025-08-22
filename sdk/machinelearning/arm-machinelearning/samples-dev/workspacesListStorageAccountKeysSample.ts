// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List storage account keys of a workspace.
 *
 * @summary List storage account keys of a workspace.
 * x-ms-original-file: specification/machinelearningservices/resource-manager/Microsoft.MachineLearningServices/stable/2024-04-01/examples/Workspace/listStorageAccountKeys.json
 */

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listWorkspaceKeys(): Promise<void> {
  const subscriptionId =
    process.env["MACHINELEARNING_SUBSCRIPTION_ID"] || "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const resourceGroupName = process.env["MACHINELEARNING_RESOURCE_GROUP"] || "testrg123";
  const workspaceName = "workspaces123";
  const credential = new DefaultAzureCredential();
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.workspaces.listStorageAccountKeys(resourceGroupName, workspaceName);
  console.log(result);
}

async function main(): Promise<void> {
  await listWorkspaceKeys();
}

main().catch(console.error);
