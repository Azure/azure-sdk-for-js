// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the workspace.
 *
 * @summary Gets the workspace.
 * x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-02-01/examples/WorkspaceGet.json
 */

import { AzureDatabricksManagementClient } from "@azure/arm-databricks";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAWorkspace(): Promise<void> {
  const subscriptionId = process.env["DATABRICKS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["DATABRICKS_RESOURCE_GROUP"] || "rg";
  const workspaceName = "myWorkspace";
  const credential = new DefaultAzureCredential();
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.workspaces.get(resourceGroupName, workspaceName);
  console.log(result);
}

/**
 * This sample demonstrates how to Gets the workspace.
 *
 * @summary Gets the workspace.
 * x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-02-01/examples/WorkspaceManagedDiskEncryptionGet.json
 */
async function getAWorkspaceWithCustomerManagedKeyCmkEncryptionForManagedDisks(): Promise<void> {
  const subscriptionId = process.env["DATABRICKS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["DATABRICKS_RESOURCE_GROUP"] || "rg";
  const workspaceName = "myWorkspace";
  const credential = new DefaultAzureCredential();
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.workspaces.get(resourceGroupName, workspaceName);
  console.log(result);
}

/**
 * This sample demonstrates how to Gets the workspace.
 *
 * @summary Gets the workspace.
 * x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-02-01/examples/WorkspaceGetParameters.json
 */
async function getAWorkspaceWithCustomParameters(): Promise<void> {
  const subscriptionId = process.env["DATABRICKS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["DATABRICKS_RESOURCE_GROUP"] || "rg";
  const workspaceName = "myWorkspace";
  const credential = new DefaultAzureCredential();
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.workspaces.get(resourceGroupName, workspaceName);
  console.log(result);
}

async function main(): Promise<void> {
  await getAWorkspace();
  await getAWorkspaceWithCustomerManagedKeyCmkEncryptionForManagedDisks();
  await getAWorkspaceWithCustomParameters();
}

main().catch(console.error);
