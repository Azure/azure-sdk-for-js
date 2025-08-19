// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates a workspace.
 *
 * @summary Updates a workspace.
 * x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-02-01/examples/WorkspaceUpdate.json
 */

import type { WorkspaceUpdate } from "@azure/arm-databricks";
import { AzureDatabricksManagementClient } from "@azure/arm-databricks";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateAWorkspaceTags(): Promise<void> {
  const subscriptionId = process.env["DATABRICKS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["DATABRICKS_RESOURCE_GROUP"] || "rg";
  const workspaceName = "myWorkspace";
  const parameters: WorkspaceUpdate = { tags: { mytag1: "myvalue1" } };
  const credential = new DefaultAzureCredential();
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.workspaces.beginUpdateAndWait(
    resourceGroupName,
    workspaceName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAWorkspaceTags();
}

main().catch(console.error);
