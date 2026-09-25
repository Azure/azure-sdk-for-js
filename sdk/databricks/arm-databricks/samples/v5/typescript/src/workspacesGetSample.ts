// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDatabricksManagementClient } from "@azure/arm-databricks";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the workspace.
 *
 * @summary gets the workspace.
 * x-ms-original-file: 2026-01-01/WorkspaceEnhancedSecurityComplianceGet.json
 */
async function getAWorkspaceWithEnhancedSecurityComplianceAddOn(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.workspaces.get("rg", "myWorkspace");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the workspace.
 *
 * @summary gets the workspace.
 * x-ms-original-file: 2026-01-01/WorkspaceGet.json
 */
async function getAWorkspace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.workspaces.get("rg", "myWorkspace");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the workspace.
 *
 * @summary gets the workspace.
 * x-ms-original-file: 2026-01-01/WorkspaceGetParameters.json
 */
async function getAWorkspaceWithCustomParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.workspaces.get("rg", "myWorkspace");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the workspace.
 *
 * @summary gets the workspace.
 * x-ms-original-file: 2026-01-01/WorkspaceManagedDiskEncryptionGet.json
 */
async function getAWorkspaceWithCustomerManagedKeyCMKEncryptionForManagedDisks(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.workspaces.get("rg", "myWorkspace");
  console.log(result);
}

async function main(): Promise<void> {
  await getAWorkspaceWithEnhancedSecurityComplianceAddOn();
  await getAWorkspace();
  await getAWorkspaceWithCustomParameters();
  await getAWorkspaceWithCustomerManagedKeyCMKEncryptionForManagedDisks();
}

main().catch(console.error);
