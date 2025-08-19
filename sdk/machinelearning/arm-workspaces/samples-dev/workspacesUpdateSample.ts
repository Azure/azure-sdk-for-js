// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WorkspaceUpdateParameters } from "@azure/arm-workspaces";
import { MachineLearningWorkspacesManagementClient } from "@azure/arm-workspaces";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Updates a machine learning workspace with the specified parameters.
 *
 * @summary Updates a machine learning workspace with the specified parameters.
 * x-ms-original-file: specification/machinelearning/resource-manager/Microsoft.MachineLearning/stable/2019-10-01/examples/UpdateWorkspace.json
 */
async function workspaceUpdate(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = "myResourceGroup";
  const workspaceName = "testworkspace";
  const parameters: WorkspaceUpdateParameters = {
    keyVaultIdentifierId: "kvidnew",
    sku: { name: "Enterprise", tier: "Enterprise" },
    tags: { tagKey1: "TagValue1" },
  };
  const credential = new DefaultAzureCredential();
  const client = new MachineLearningWorkspacesManagementClient(credential, subscriptionId);
  const result = await client.workspaces.update(resourceGroupName, workspaceName, parameters);
  console.log(result);
}

workspaceUpdate().catch(console.error);
