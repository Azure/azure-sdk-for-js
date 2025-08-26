// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * This sample demonstrates how to Creates or updates a workspace with the specified parameters.
 *
 * @summary Creates or updates a workspace with the specified parameters.
 * x-ms-original-file: specification/machinelearning/resource-manager/Microsoft.MachineLearning/stable/2019-10-01/examples/CreateWorkspace.json
 */
import type { Workspace } from "@azure/arm-workspaces";
import { MachineLearningWorkspacesManagementClient } from "@azure/arm-workspaces";
import { DefaultAzureCredential } from "@azure/identity";

async function workspaceCreate(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = "myResourceGroup";
  const workspaceName = "testworkspace";
  const parameters: Workspace = {
    location: "West Europe",
    ownerEmail: "abc@microsoft.com",
    sku: { name: "Enterprise", tier: "Enterprise" },
    tags: { tagKey1: "TagValue1" },
    userStorageAccountId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.Storage/storageAccounts/teststorage",
  };
  const credential = new DefaultAzureCredential();
  const client = new MachineLearningWorkspacesManagementClient(credential, subscriptionId);
  const result = await client.workspaces.createOrUpdate(
    resourceGroupName,
    workspaceName,
    parameters,
  );
  console.log(result);
}

workspaceCreate().catch(console.error);
