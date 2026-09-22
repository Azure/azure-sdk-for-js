// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDatabricksManagementClient } = require("@azure/arm-databricks");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the workspace.
 *
 * @summary gets the workspace.
 * x-ms-original-file: 2026-01-01/WorkspaceEnhancedSecurityComplianceGet.json
 */
async function getAWorkspaceWithEnhancedSecurityComplianceAddOn() {
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
async function getAWorkspace() {
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
async function getAWorkspaceWithCustomParameters() {
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
async function getAWorkspaceWithCustomerManagedKeyCMKEncryptionForManagedDisks() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.workspaces.get("rg", "myWorkspace");
  console.log(result);
}

async function main() {
  await getAWorkspaceWithEnhancedSecurityComplianceAddOn();
  await getAWorkspace();
  await getAWorkspaceWithCustomParameters();
  await getAWorkspaceWithCustomerManagedKeyCMKEncryptionForManagedDisks();
}

main().catch(console.error);
