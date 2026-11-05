// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChaosManagementClient } = require("@azure/arm-chaos");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Workspace resource.
 *
 * @summary get a Workspace resource.
 * x-ms-original-file: 2026-11-01/Workspaces_Get.json
 */
async function getAWorkspaceInAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.workspaces.get("exampleRG", "exampleWorkspace");
  console.log(result);
}

/**
 * This sample demonstrates how to get a Workspace resource.
 *
 * @summary get a Workspace resource.
 * x-ms-original-file: 2026-11-01/Workspaces_Get_EncryptionFailed.json
 */
async function getAWorkspaceAfterACustomerKeyReplacementFails() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.workspaces.get("exampleRG", "exampleWorkspace");
  console.log(result);
}

/**
 * This sample demonstrates how to get a Workspace resource.
 *
 * @summary get a Workspace resource.
 * x-ms-original-file: 2026-11-01/Workspaces_Get_EncryptionNotConfigured.json
 */
async function getAWorkspaceServiceApplicationBeforeCustomerKeyEnrollment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.workspaces.get("exampleRG", "exampleWorkspace");
  console.log(result);
}

/**
 * This sample demonstrates how to get a Workspace resource.
 *
 * @summary get a Workspace resource.
 * x-ms-original-file: 2026-11-01/Workspaces_Get_EncryptionPending.json
 */
async function getACMKCreatedWorkspaceWhileItsCustomerKeyIsBeingReplaced() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.workspaces.get("exampleRG", "exampleWorkspace");
  console.log(result);
}

/**
 * This sample demonstrates how to get a Workspace resource.
 *
 * @summary get a Workspace resource.
 * x-ms-original-file: 2026-11-01/Workspaces_Get_EncryptionUnknown.json
 */
async function getAWorkspaceWhenActiveEncryptionProtectionIsUnknown() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.workspaces.get("exampleRG", "exampleWorkspace");
  console.log(result);
}

async function main() {
  await getAWorkspaceInAResourceGroup();
  await getAWorkspaceAfterACustomerKeyReplacementFails();
  await getAWorkspaceServiceApplicationBeforeCustomerKeyEnrollment();
  await getACMKCreatedWorkspaceWhileItsCustomerKeyIsBeingReplaced();
  await getAWorkspaceWhenActiveEncryptionProtectionIsUnknown();
}

main().catch(console.error);
