// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to resync all the keys associated with this workspace.This includes keys for the storage account, app insights and password for container registry
 *
 * @summary resync all the keys associated with this workspace.This includes keys for the storage account, app insights and password for container registry
 * x-ms-original-file: 2025-12-01/Workspace/resyncKeys.json
 */
async function resyncWorkspaceKeys() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.workspaces.resyncKeys("testrg123", "workspaces123");
}

async function main() {
  await resyncWorkspaceKeys();
}

main().catch(console.error);
